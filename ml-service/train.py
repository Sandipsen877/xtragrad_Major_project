"""
Train the Modified CNN2D described in the project report.

Expected dataset layout:
dataset/
  train/
    Fake/
    Real/
  test/
    Fake/
    Real/

Each image is resized to 32x32 and normalized to [0,1].
Labels follow the report convention: 0 = Fake, 1 = Real.

Example:
  python train.py --data ./dataset --epochs 30
"""

from pathlib import Path
import argparse
import tensorflow as tf

IMG_SIZE = (32, 32)
BATCH_SIZE = 128

def build_model():
    inputs = tf.keras.Input(shape=(32, 32, 3))

    x = tf.keras.layers.Conv2D(32, 3, padding="same", activation="relu")(inputs)
    x = tf.keras.layers.MaxPooling2D()(x)

    x = tf.keras.layers.Conv2D(64, 3, padding="same", activation="relu")(x)
    x = tf.keras.layers.MaxPooling2D()(x)

    x = tf.keras.layers.Conv2D(128, 3, padding="same", activation="relu")(x)
    x = tf.keras.layers.MaxPooling2D()(x)

    x = tf.keras.layers.Conv2D(256, 3, padding="same", activation="relu")(x)

    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(0.40)(x)
    x = tf.keras.layers.Dense(64, activation="relu")(x)
    x = tf.keras.layers.Dropout(0.25)(x)

    outputs = tf.keras.layers.Dense(1, activation="sigmoid")(x)

    model = tf.keras.Model(inputs, outputs, name="ModifiedCNN2D")
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss="binary_crossentropy",
        metrics=[
            "accuracy",
            tf.keras.metrics.Precision(name="precision"),
            tf.keras.metrics.Recall(name="recall"),
        ],
    )
    return model

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", required=True, help="Dataset root containing train/ and test/")
    parser.add_argument("--epochs", type=int, default=30)
    args = parser.parse_args()

    root = Path(args.data)
    train_dir = root / "train"
    test_dir = root / "test"

    train_ds = tf.keras.utils.image_dataset_from_directory(
        train_dir,
        labels="inferred",
        label_mode="binary",
        class_names=["Fake", "Real"],
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        shuffle=True,
        seed=42,
    )

    test_ds = tf.keras.utils.image_dataset_from_directory(
        test_dir,
        labels="inferred",
        label_mode="binary",
        class_names=["Fake", "Real"],
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        shuffle=False,
    )

    normalization = tf.keras.layers.Rescaling(1.0 / 255)
    train_ds = train_ds.map(lambda x, y: (normalization(x), y), num_parallel_calls=tf.data.AUTOTUNE)
    test_ds = test_ds.map(lambda x, y: (normalization(x), y), num_parallel_calls=tf.data.AUTOTUNE)

    train_ds = train_ds.prefetch(tf.data.AUTOTUNE)
    test_ds = test_ds.prefetch(tf.data.AUTOTUNE)

    model = build_model()

    weights_dir = Path(__file__).parent / "weights"
    weights_dir.mkdir(exist_ok=True)
    best_path = weights_dir / "cifake_model.keras"

    callbacks = [
        tf.keras.callbacks.EarlyStopping(
            monitor="val_loss", patience=6, restore_best_weights=True
        ),
        tf.keras.callbacks.ReduceLROnPlateau(
            monitor="val_loss", factor=0.5, patience=3, min_lr=1e-6
        ),
        tf.keras.callbacks.ModelCheckpoint(
            best_path, monitor="val_accuracy", save_best_only=True
        ),
    ]

    model.fit(
        train_ds,
        validation_data=test_ds,
        epochs=args.epochs,
        callbacks=callbacks,
    )

    print(f"Saved best model to: {best_path}")

if __name__ == "__main__":
    main()