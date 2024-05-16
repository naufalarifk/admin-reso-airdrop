import { Button } from "@/components"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/')
    console.log('zamn')
  }
  return (
    <main className="overflow-x-hidden min-h-screen bg-dark flex items-center h-full">
      <img
        src="/images/wave.png"
        className="absolute w-[1920px] h-[1080px] -top-1 -z-10"
        alt=""
      />
      <div className="flex flex-col lg:w-1/2 w-3/4 mx-auto my-auto">
        <img className="" src="/images/notfound.png" alt="" />
        <Button onClick={handleNavigate} className="bg-[#F23F5D] rounded-full lg:w-2/3 w-full mx-auto z-10 mt-2">Back to Home</Button>
      </div>
    </main>
  )
}