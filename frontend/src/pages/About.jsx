
import {
  Brain,
  Eye,
  Database,
  Code2,
  Server,
  Globe,
  Sparkles,
  ArrowUpRight,
  Activity,
  ShieldCheck,
  Cpu,
  Zap,
  CheckCircle2,
  CircleDot,
  Workflow,
  Rocket,
  ScanFace,
} from "lucide-react"

const About = () => {
  const pipeline = [
    {
      number: "01",
      icon: <Database className="w-5 h-5" />,
      title: "CIFAKE Dataset",
      text: "120K real and synthetic images used to train and evaluate the detector.",
      tag: "DATA",
    },
    {
      number: "02",
      icon: <Brain className="w-5 h-5" />,
      title: "Modified CNN",
      text: "Convolutional architecture with Global Average Pooling and Dropout.",
      tag: "MODEL",
    },
    {
      number: "03",
      icon: <Eye className="w-5 h-5" />,
      title: "Explainability",
      text: "Grad-CAM ready architecture for visual interpretation of predictions.",
      tag: "XAI",
    },
    {
      number: "04",
      icon: <ScanFace className="w-5 h-5" />,
      title: "AI Prediction",
      text: "Image classification with Real/Fake prediction and confidence score.",
      tag: "OUTPUT",
    },
  ]

  const technologies = [
    {
      name: "React",
      role: "Interface",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      name: "Express.js",
      role: "API Layer",
      icon: <Server className="w-4 h-4" />,
    },
    {
      name: "FastAPI",
      role: "ML Service",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      name: "TensorFlow",
      role: "Inference",
      icon: <Brain className="w-4 h-4" />,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-24">

      {/* 
          HEADER
       */}

      <section className="max-w-3xl space-y-5">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60">

          <CircleDot className="w-3 h-3 text-zinc-300" />

          <span className="font-ai text-[12px] tracking-[0.18em] text-zinc-400">
            About This Project
          </span>

        </div>

        <h1 className="font-ai text-3xl sm:text-4xl md:text-5xl tracking-tight text-zinc-100">
          Understanding{" "}
          <span className="text-zinc-600">
            Z-Vision.
          </span>
        </h1>

        <p className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
          Z-Vision combines computer vision, deep learning and modern
          full-stack engineering to identify AI-generated images and
          make model decisions easier to understand.
        </p>

      </section>


      {/* 
          PROJECT OVERVIEW
       */}

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Main overview */}

        <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-7 sm:p-8 relative overflow-hidden">

          {/* Grid background */}

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative space-y-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Code2 className="w-5 h-5 text-zinc-300" />

                <h2 className="font-ai text-sm sm:text-base text-zinc-100 tracking-wide">
                  PROJECT OVERVIEW
                </h2>

              </div>

              <span className="font-ai text-[9px] tracking-widest text-zinc-600">
                ZV / 01
              </span>

            </div>

            <p className="text-zinc-400 leading-relaxed">
              Generative AI has made synthetic imagery increasingly difficult
              to distinguish from authentic photographs. Z-Vision approaches
              this problem as an image classification task using a deep
              convolutional neural network.
            </p>

            <p className="text-zinc-400 leading-relaxed">

              Users upload an image and the system processes it through a
              dedicated ML inference service before returning a{" "}

              <span className="font-medium text-zinc-200">
                Real / Fake prediction
              </span>{" "}

              together with a confidence score.

            </p>

            <div className="flex flex-wrap gap-2 pt-2">

              {[
                "Computer Vision",
                "Deep Learning",
                "Explainable AI",
              ].map((tag) => (

                <span
                  key={tag}
                  className="font-ai text-[9px] tracking-wide px-3 py-1.5 rounded-full bg-zinc-800/70 border border-zinc-700 text-zinc-400"
                >
                  {tag}
                </span>

              ))}

            </div>

          </div>

        </div>


        {/* Quick facts */}

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between min-h-[170px]">

            <Activity className="w-5 h-5 text-zinc-500" />

            <div>

              <p className="font-ai text-2xl sm:text-3xl text-zinc-100">
                120K
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                Training Images
              </p>

            </div>

          </div>


          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between min-h-[170px]">

            <Cpu className="w-5 h-5 text-zinc-500" />

            <div>

              <p className="font-ai text-2xl sm:text-3xl text-zinc-100">
                CNN
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                Detection Architecture
              </p>

            </div>

          </div>


          <div className="col-span-2 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">

                <ShieldCheck className="w-4 h-4 text-zinc-300" />

              </div>

              <div>

                <p className="font-medium text-sm text-zinc-200">
                  Detection System
                </p>

                <p className="text-xs text-zinc-600 mt-0.5">
                  Built for research & experimentation
                </p>

              </div>

            </div>

            <ArrowUpRight className="w-4 h-4 text-zinc-600" />

          </div>

        </div>

      </section>


      {/* 
        MODEL PERFORMANCE
       */}

      <section className="space-y-7">

        <div className="flex items-end justify-between">

          <div>

            <p className="font-ai text-[9px] tracking-[0.2em] text-zinc-600 mb-2">
              MODEL INTELLIGENCE
            </p>

            <h2 className="font-ai text-xl sm:text-2xl text-zinc-100 tracking-wide">
              Performance at a glance
            </h2>

            <p className="text-sm text-zinc-500 mt-2">
              Evaluation metrics from the trained detection model.
            </p>

          </div>

          <div className="hidden sm:flex items-center gap-2">

            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />

            <span className="font-ai text-[8px] tracking-widest text-zinc-500">
              EVALUATED MODEL
            </span>

          </div>

        </div>


        {/* Performance Bento */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Accuracy */}

          <div className="md:col-span-5 md:row-span-2 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-7 relative overflow-hidden">

            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-zinc-800/60" />

            <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full border border-zinc-800/40" />

            <div className="relative h-full flex flex-col justify-between min-h-[310px]">

              <div className="flex items-center justify-between">

                <span className="font-ai text-[9px] tracking-[0.2em] text-zinc-200">
                  ACCURACY
                </span>

                <Rocket className="w-4 h-4 text-zinc-500" />

              </div>

              <div>

                <div className="flex items-end gap-2">

                  <span className="font-ai text-5xl sm:text-6xl tracking-tight text-zinc-100">
                    89.77
                  </span>

                  <span className="font-ai text-lg text-zinc-500 mb-2">
                    %
                  </span>

                </div>

                <p className="text-sm text-zinc-500 mt-3">
                  Overall classification accuracy
                </p>

              </div>

              <div className="space-y-2">

                <div className="flex justify-between text-xs">

                  <span className="text-zinc-600">
                    Model score
                  </span>

                  <span className="font-ai text-[9px] text-zinc-400">
                    89.77%
                  </span>

                </div>

                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-zinc-200 rounded-full"
                    style={{ width: "89.77%" }}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* Precision */}

          <div className="md:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="font-ai text-[9px] tracking-[0.2em] text-zinc-200">
                  PRECISION
                </p>

                <p className="font-ai text-2xl sm:text-3xl text-zinc-100 mt-2">
                  83.43%
                </p>

              </div>

              <div className="w-16 h-16 rounded-full border-4 border-zinc-700 flex items-center justify-center">

                <span className="font-ai text-[10px] text-zinc-400">
                  P
                </span>

              </div>

            </div>

            <div className="mt-5 h-1 bg-zinc-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-zinc-400"
                style={{ width: "83.43%" }}
              />

            </div>

            <p className="text-xs text-zinc-600 mt-3">
              How often predicted positives are actually positive.
            </p>

          </div>


          {/* Recall */}

          <div className="md:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="font-ai text-[9px] tracking-[0.2em] text-zinc-200">
                  RECALL
                </p>

                <p className="font-ai text-2xl sm:text-3xl text-zinc-100 mt-2">
                  99.07%
                </p>

              </div>

              <div className="flex items-end gap-1 h-12">

                {[30, 45, 38, 65, 58, 80, 72, 92, 99].map(
                  (height, index) => (

                    <div
                      key={index}
                      className="w-1.5 bg-zinc-600 rounded-full"
                      style={{ height: `${height}%` }}
                    />

                  )
                )}

              </div>

            </div>

            <p className="text-xs text-zinc-600 mt-5">
              Ability to identify the positive class across the dataset.
            </p>

          </div>

        </div>

      </section>


      {/* 
          AI PIPELINE
       */}

      <section className="space-y-7">

        <div>

          <p className="font-ai text-[9px] tracking-[0.2em] text-zinc-600 mb-2">
            INTELLIGENCE PIPELINE
          </p>

          <h2 className="font-ai text-xl sm:text-2xl text-zinc-100 tracking-wide">
            From image to decision
          </h2>

          <p className="text-sm text-zinc-500 mt-2">
            The core stages behind every Z-Vision prediction.
          </p>

        </div>


        <div className="relative">

          {/* Connector */}

          <div className="hidden md:block absolute top-[55px] left-[8%] right-[8%] h-px bg-zinc-800" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">

            {pipeline.map((item, index) => (

              <div
                key={index}
                className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300"
              >

                <div className="flex items-center justify-between">

                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:scale-105 transition-transform">

                    {item.icon}

                  </div>

                  <span className="font-ai text-[9px] tracking-widest text-zinc-600">
                    {item.number}
                  </span>

                </div>

                <div className="mt-8">

                  <span className="font-ai text-[8px] tracking-[0.2em] text-zinc-600">
                    {item.tag}
                  </span>

                  <h3 className="font-semibold text-base text-zinc-100 mt-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-500 leading-relaxed mt-2">
                    {item.text}
                  </p>

                </div>

                {index < pipeline.length - 1 && (

                  <div className="hidden md:block absolute -right-2 top-[49px] z-10 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700" />

                )}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* 
          TECHNOLOGY STACK
     */}

      <section className="space-y-7">

        <div>

          <p className="font-ai text-[9px] tracking-[0.2em] text-zinc-600 mb-2">
            SYSTEM ARCHITECTURE
          </p>

          <h2 className="font-ai text-xl sm:text-2xl text-zinc-100 tracking-wide">
            Built as a connected stack
          </h2>

          <p className="text-sm text-zinc-500 mt-2">
            Each layer has a dedicated responsibility in the detection pipeline.
          </p>

        </div>


        {/* Architecture */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-5 sm:p-8 overflow-hidden">

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">


            {/* React */}

            <div className="flex-1 min-w-0">

              <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">

                    <Globe className="w-4 h-4 text-zinc-300" />

                  </div>

                  <div>

                    <p className="font-ai text-xs text-zinc-100">
                      REACT
                    </p>

                    <p className="text-xs text-zinc-600">
                      User Interface
                    </p>

                  </div>

                </div>

              </div>

            </div>


            <ArrowUpRight className="hidden lg:block w-4 h-4 text-zinc-700" />


            {/* Express */}

            <div className="flex-1 min-w-0">

              <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">

                    <Server className="w-4 h-4 text-zinc-300" />

                  </div>

                  <div>

                    <p className="font-ai text-xs text-zinc-100">
                      EXPRESS.JS
                    </p>

                    <p className="text-xs text-zinc-600">
                      Backend API
                    </p>

                  </div>

                </div>

              </div>

            </div>


            <ArrowUpRight className="hidden lg:block w-4 h-4 text-zinc-700" />


            {/* FastAPI */}

            <div className="flex-1 min-w-0">

              <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">

                    <Workflow className="w-4 h-4 text-zinc-300" />

                  </div>

                  <div>

                    <p className="font-ai text-xs text-zinc-100">
                      FASTAPI
                    </p>

                    <p className="text-xs text-zinc-600">
                      ML Inference
                    </p>

                  </div>

                </div>

              </div>

            </div>


            <ArrowUpRight className="hidden lg:block w-4 h-4 text-zinc-700" />


            {/* TensorFlow */}

            <div className="flex-1 min-w-0">

              <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">

                    <Brain className="w-4 h-4 text-zinc-300" />

                  </div>

                  <div>

                    <p className="font-ai text-xs text-zinc-100">
                      TENSORFLOW
                    </p>

                    <p className="text-xs text-zinc-600">
                      CNN Model
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Architecture status */}

          <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse" />

              <span className="font-ai text-[8px] tracking-widest text-zinc-500">
                MODULAR ARCHITECTURE
              </span>

            </div>

            <span className="text-xs text-zinc-600">
              Frontend → API → ML Inference → Prediction
            </span>

          </div>

        </div>


        {/* Technology chips */}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

          {technologies.map((tech, index) => (

            <div
              key={index}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all"
            >

              <div className="flex items-center justify-between">

                <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  {tech.icon}
                </div>

                <span className="font-ai text-[7px] uppercase tracking-widest text-zinc-700">
                  {tech.role}
                </span>

              </div>

              <p className="font-ai text-[10px] text-zinc-200 mt-4">
                {tech.name}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* 
          DISCLAIMER
      */}

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 sm:p-7">

        <div className="flex gap-4">

          <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />

          <p className="text-sm text-zinc-500 leading-relaxed">

            <span className="font-medium text-zinc-300">
              Research note:
            </span>{" "}
            Z-Vision is developed for educational and research purposes.
            Detection results are probabilistic and should not be considered
            definitive. Performance can vary on images that differ from the
            CIFAKE training distribution, especially as generative models
            continue to evolve.

          </p>

        </div>

      </section>

    </div>
  )
}

export default About
