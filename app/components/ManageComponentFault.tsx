import { useRouter } from "next/navigation";

function ManageComponentFault({ username, title, date, status, id, type }: ({ username: string, title: string, date: string, status: string, id: string, type: string })) {
    const Router = useRouter()

    const handleNavigation = () => {
        Router.push(`/fault/${id}`)
    }

    return (
        <div className="flex border-b-2 border-blue-100 border-t-2 items-center justify-between p-3">
            <h4 className="text-blue-700 flex-[1]">{username}</h4>
            <h4 className="text-blue-700 flex-[2] truncate max-w-[300px] mr-4">{title}</h4> {/* Allows more space for the title */}
            <h4 className="text-blue-700 flex-[1] ml-4">{date}</h4> {/* Ensures date has enough space */}
            <h4 className="text-yellow-400 flex-[1]">{status}</h4>
            <button className="bg-blue-950 p-3 rounded" onClick={handleNavigation}>Manage</button>
        </div>
    )
}

export default ManageComponentFault;
