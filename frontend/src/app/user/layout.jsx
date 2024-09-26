import Sidebar from "@/components/sidebar";

const userLayout = ({children}) => {
  return (
    <div className="grid grid-cols-12">
        <div className="col-span-2 overflow-hidden bg-gray-100 shadow-md">
        <Sidebar />
        </div>
        <div className="col-span-10">
        {children}
        </div>
    </div>
  )
}

export default userLayout