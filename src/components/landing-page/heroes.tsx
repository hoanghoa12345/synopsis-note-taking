
export const Heroes = () => {
  return <div className="flex flex-col items-center justify-center max-w-5xl">
    <div className="flex items-center">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
        <img className="object-contain dark:invert dark:grayscale" src="https://illustrations.popsy.co/amber/business-success-chart.svg" alt="popsy.co" />
      </div>
      <div className="relative h-[400px] w-[400px] hidden md:block">
        <img className="object-contain dark:invert dark:grayscale" src="https://illustrations.popsy.co/amber/success.svg" alt="popsy.co" />
      </div>
    </div>
  </div>
}