import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

const Roadmap = ({ features }) => {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      /*
       * The animation starts when the roadmap
       * starts entering the viewport.
       */
      const startPoint = viewportHeight * 0.75

      /*
       * Calculate how far the user has moved
       * through the roadmap section.
       */
      const distance = rect.height - viewportHeight * 0.35

      const currentPosition = startPoint - rect.top

      let calculatedProgress =
        currentPosition / distance

      calculatedProgress = Math.max(
        0,
        Math.min(1, calculatedProgress)
      )

      setProgress(calculatedProgress)
    }

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    handleScroll()

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [])

  /*
   * Calculate how active a particular card should be.
   */
  const getStepProgress = (index) => {
    const totalSteps = features.length

    return Math.max(
      0,
      Math.min(
        1,
        progress * totalSteps - index
      )
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >

      
      {/* HEADER */}
      

      <div className="text-center max-w-2xl mx-auto mb-24 sm:mb-32">

        

        <h2
          className="
            font-ai
            text-3xl
            sm:text-4xl
            font-bold
            text-zinc-100
            mb-5
          "
        >
          Why Z-Vision?
        </h2>

        <p
          className="
            font-body
            text-zinc-400
            leading-relaxed
          "
        >
          A practical AI system combining deep learning,
          explainability, real-time inference, and cloud deployment.
        </p>

      </div>


       {/* ROADMAP */}

      <div className="relative max-w-6xl mx-auto">


        
        {/* CENTER BASE PATH */}
        

        <div
          className="
            absolute
            hidden
            md:block
            left-1/2
            top-0
            bottom-0
            -translate-x-1/2
            w-[2px]
            bg-zinc-800
          "
        />


        
        {/* GLOWING PATH */}
        

        <div
          className="
            absolute
            hidden
            md:block
            left-1/2
            top-0
            -translate-x-1/2
            w-[3px]
            bg-gradient-to-b
            from-zinc-100
            via-zinc-300
            to-zinc-500
            rounded-full
          "
          style={{
            height: `${progress * 100}%`,
            boxShadow:
              progress > 0
                ? `
                  0 0 6px rgba(255,255,255,0.9),
                  0 0 15px rgba(255,255,255,0.4),
                  0 0 30px rgba(255,255,255,0.15)
                `
                : 'none'
          }}
        />


        
        {/* MOBILE PATH */}
        

        <div
          className="
            absolute
            md:hidden
            left-[9px]
            top-0
            bottom-0
            w-[2px]
            bg-zinc-800
          "
        />

        <div
          className="
            absolute
            md:hidden
            left-[8px]
            top-0
            w-[3px]
            bg-gradient-to-b
            from-zinc-100
            via-zinc-300
            to-zinc-500
            rounded-full
          "
          style={{
            height: `${progress * 100}%`,
            boxShadow:
              progress > 0
                ? '0 0 10px rgba(255,255,255,0.6)'
                : 'none'
          }}
        />


        
        {/* ROADMAP ITEMS */}
        

        <div className="relative space-y-24 sm:space-y-32">

          {features.map((feature, index) => {

            const stepProgress =
              getStepProgress(index)

            const active =
              stepProgress > 0

            const completed =
              stepProgress >= 0.85

            const isLeft =
              index % 2 === 0

            return (
              <div
                key={index}
                className="
                  relative
                  min-h-[190px]
                  md:min-h-[220px]
                  flex
                  items-center
                "
              >


                
                {/* MOBILE NODE */}
                

                <div
                  className="
                    absolute
                    md:hidden
                    left-0
                    top-1/2
                    -translate-y-1/2
                    z-20
                  "
                >

                  <div
                    className={`
                      absolute
                      inset-[-10px]
                      rounded-full
                      blur-md
                      transition-all
                      duration-700
                      ${
                        active
                          ? 'bg-white/20 scale-100'
                          : 'bg-transparent scale-75'
                      }
                    `}
                  />

                  <div
                    className={`
                      relative
                      w-5
                      h-5
                      rounded-full
                      border-2
                      transition-all
                      duration-700
                      ${
                        active
                          ? `
                            bg-zinc-100
                            border-white
                            shadow-[0_0_12px_rgba(255,255,255,0.9)]
                          `
                          : `
                            bg-zinc-950
                            border-zinc-700
                          `
                      }
                    `}
                  />

                </div>


               
                {/* DESKTOP LEFT CARD */}
               

                {isLeft && (
                  <div
                    className="
                      hidden
                      md:block
                      w-1/2
                      pr-16
                    "
                  >

                    <RoadmapCard
                      feature={feature}
                      index={index}
                      active={active}
                      completed={completed}
                    />

                  </div>
                )}


                
                {/* DESKTOP RIGHT CARD */}
                

                {!isLeft && (
                  <div
                    className="
                      hidden
                      md:block
                      w-1/2
                      ml-auto
                      pl-16
                    "
                  >

                    <RoadmapCard
                      feature={feature}
                      index={index}
                      active={active}
                      completed={completed}
                    />

                  </div>
                )}


                
                {/* DESKTOP CENTER NODE */}
               

                <div
                  className="
                    hidden
                    md:flex
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    z-20
                  "
                >

                  {/* Outer glow */}

                  <div
                    className={`
                      absolute
                      rounded-full
                      blur-md
                      transition-all
                      duration-700
                      ${
                        active
                          ? 'w-12 h-12 bg-white/10'
                          : 'w-8 h-8 bg-transparent'
                      }
                    `}
                  />

                  {/* Node */}

                  <div
                    className={`
                      relative
                      w-5
                      h-5
                      rounded-full
                      border-2
                      transition-all
                      duration-700
                      ${
                        active
                          ? `
                            bg-zinc-100
                            border-white
                            shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_30px_rgba(255,255,255,0.3)]
                          `
                          : `
                            bg-zinc-950
                            border-zinc-700
                          `
                      }
                    `}
                  />

                </div>


                
                {/* DESKTOP CONNECTOR */}
                

                <div
                  className={`
                    hidden
                    md:block
                    absolute
                    top-1/2
                    h-px
                    z-10
                    transition-all
                    duration-700

                    ${
                      isLeft
                        ? `
                          right-1/2
                          w-16
                        `
                        : `
                          left-1/2
                          w-16
                        `
                    }

                    ${
                      active
                        ? 'bg-zinc-400'
                        : 'bg-zinc-800'
                    }
                  `}
                />


                {/* MOBILE CARD */}


                <div
                  className="
                    md:hidden
                    w-full
                    pl-10
                  "
                >

                  <RoadmapCard
                    feature={feature}
                    index={index}
                    active={active}
                    completed={completed}
                  />

                </div>

              </div>
            )
          })}

        </div>
      </div>


     
      {/* FINAL STATUS */}
      

      <div className="flex justify-center mt-28 sm:mt-36">

        <div
          className={`
            flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-full
            border
            text-xs
            font-body
            transition-all
            duration-700

            ${
              progress >= 0.9
                ? `
                  border-zinc-500
                  text-zinc-200
                  bg-zinc-900/70
                  shadow-[0_0_30px_rgba(255,255,255,0.08)]
                `
                : `
                  border-zinc-800
                  text-zinc-600
                `
            }
          `}
        >

          <span
            className={`
              w-1.5
              h-1.5
              rounded-full
              transition-all
              duration-700

              ${
                progress >= 0.9
                  ? 'bg-zinc-100 shadow-[0_0_8px_white]'
                  : 'bg-zinc-700'
              }
            `}
          />

          SYSTEM READY

        </div>

      </div>

    </section>
  )
}



/* ROADMAP CARD */


const RoadmapCard = ({
  feature,
  index,
  active,
  completed
}) => {

  return (
    <div
      className={`
        group
        relative
        w-full
        p-6
        sm:p-7
        rounded-2xl
        border
        backdrop-blur-md
        transition-all
        duration-700

        ${
          active
            ? `
              bg-zinc-900/90
              border-zinc-600
              shadow-[0_0_40px_rgba(255,255,255,0.06)]
              -translate-y-1
            `
            : `
              bg-zinc-950/60
              border-zinc-800
            `
        }

        hover:border-zinc-500
        hover:-translate-y-1
      `}
    >

      
      {/* TOP LINE */}
  

      <div className="flex items-center gap-3 mb-5">

        <span
          className={`
            font-ai
            text-xs
            tracking-wider
            transition-colors
            duration-500

            ${
              active
                ? 'text-zinc-100'
                : 'text-zinc-600'
            }
          `}
        >
          0{index + 1}
        </span>

        <div className="h-px flex-1 bg-zinc-800" />

        <span
          className={`
            font-body
            text-[10px]
            uppercase
            tracking-[0.2em]
            transition-colors
            duration-500

            ${
              active
                ? 'text-zinc-400'
                : 'text-zinc-700'
            }
          `}
        >
          {completed ? 'Complete' : 'Step'}
        </span>

      </div>


      {/* ICON */}
   

      <div
        className={`
          inline-flex
          items-center
          justify-center
          p-3
          rounded-xl
          border
          mb-5
          transition-all
          duration-700

          ${
            active
              ? `
                bg-zinc-800
                border-zinc-600
                shadow-[0_0_20px_rgba(255,255,255,0.08)]
              `
              : `
                bg-zinc-900
                border-zinc-800
              `
          }
        `}
      >
        {feature.icon}
      </div>


      {/* TITLE */}
      

      <h3
        className={`
          font-body
          text-lg
          sm:text-xl
          font-semibold
          mb-2
          transition-colors
          duration-500

          ${
            active
              ? 'text-zinc-100'
              : 'text-zinc-400'
          }
        `}
      >
        {feature.title}
      </h3>


   
      {/* DESCRIPTION */}
     

      <p
        className="
          font-body
          text-sm
          text-zinc-500
          leading-relaxed
        "
      >
        {feature.description}
      </p>


      {/* BOTTOM PROGRESS */}
      

      <div
        className={`
          absolute
          bottom-0
          left-0
          h-[2px]
          rounded-full
          bg-gradient-to-r
          from-zinc-400
          to-zinc-100
          transition-all
          duration-700

          ${
            completed
              ? 'w-full opacity-100'
              : active
                ? 'w-1/2 opacity-60'
                : 'w-0 opacity-0'
          }
        `}
      />

    </div>
  )
}

export default Roadmap