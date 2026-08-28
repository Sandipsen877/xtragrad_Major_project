const TechStack = () => {
  const technologies = [
    {
      name: 'React',
      short: 'REACT'
    },
    {
      name: 'Tailwind CSS',
      short: 'TAILWIND'
    },
    {
      name: 'JavaScript',
      short: 'JS'
    },
    {
      name: 'Node.js',
      short: 'NODE'
    },
    {
      name: 'Express.js',
      short: 'EXPRESS'
    },
    {
      name: 'FastAPI',
      short: 'FASTAPI'
    },
    {
      name: 'Python',
      short: 'PYTHON'
    },
    {
      name: 'TensorFlow',
      short: 'TENSORFLOW'
    },
    {
      name: 'CNN',
      short: 'CNN'
    },
    {
      name: 'OpenCV',
      short: 'OPENCV'
    },
    {
      name: 'Vercel',
      short: 'VERCEL'
    },
    {
      name: 'Render',
      short: 'RENDER'
    },
    {
      name: 'GitHub',
      short: 'GITHUB'
    }
  ]

  /*
   * Duplicate the list so the marquee can
   * continuously loop without a visible gap.
   */
  const marqueeItems = [
    ...technologies,
    ...technologies
  ]

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">

      
      {/* SECTION HEADER */}
      

      <div className="text-center mb-10">

        <p
          className="
            font-body
            text-xs
            uppercase
            tracking-[0.3em]
            text-zinc-600
            mb-3
          "
        >
          POWERED BY
        </p>

        <h2
          className="
            font-ai
            text-xl
            sm:text-2xl
            text-zinc-300
          "
        >
          Our Technology Stack
        </h2>

      </div>


      
      {/* MARQUEE CONTAINER */}

      <div className="relative w-full overflow-hidden">


        
        {/* LEFT FADE */}

        <div
          className="
            absolute
            left-0
            top-0
            bottom-0
            w-24
            sm:w-40
            z-10
            pointer-events-none
            bg-gradient-to-r
            from-zinc-950
            to-transparent
          "
        />



        {/* RIGHT FADE */}

        <div
          className="
            absolute
            right-0
            top-0
            bottom-0
            w-24
            sm:w-40
            z-10
            pointer-events-none
            bg-gradient-to-l
            from-zinc-950
            to-transparent
          "
        />


        
        {/* MOVING TRAIN */}
    

        <div
          className="
            flex
            w-max
            animate-tech-marquee
          "
        >

          {marqueeItems.map((tech, index) => (

            <div
              key={`${tech.name}-${index}`}
              className="
                flex
                items-center
                gap-5
                mx-3
                sm:mx-4
              "
            >

              {/* Technology Card */}

              <div
                className="
                  group
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/60
                  backdrop-blur-sm
                  whitespace-nowrap
                  transition-all
                  duration-300
                  hover:border-zinc-600
                  hover:bg-zinc-900
                "
              >

                {/* Tech indicator */}

                <div
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-zinc-600
                    group-hover:bg-zinc-200
                    group-hover:shadow-[0_0_8px_rgba(255,255,255,0.7)]
                    transition-all
                    duration-300
                  "
                />

                {/* Tech name */}

                <span
                  className="
                    font-body
                    text-sm
                    font-medium
                    text-zinc-500
                    group-hover:text-zinc-200
                    transition-colors
                    duration-300
                  "
                >
                  {tech.name}
                </span>

                {/* Short label */}

                <span
                  className="
                    font-ai
                    text-[9px]
                    tracking-wider
                    text-zinc-700
                    group-hover:text-zinc-500
                    transition-colors
                    duration-300
                  "
                >
                  {tech.short}
                </span>

              </div>


              {/* Separator */}

              <span
                className="
                  text-zinc-800
                  text-sm
                  select-none
                "
              >
                ◆
              </span>

            </div>

          ))}

        </div>

      </div>


      
      {/* BOTTOM STATUS */}
      

      <div className="flex justify-center mt-8">

        <div
          className="
            inline-flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.25em]
            font-body
            text-zinc-700
          "
        >

          <span
            className="
              w-1.5
              h-1.5
              rounded-full
              bg-zinc-600
              animate-pulse
            "
          />

          AI SYSTEM TECHNOLOGIES

        </div>

      </div>

    </section>
  )
}

export default TechStack