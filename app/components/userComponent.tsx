
import { useRouter } from "next/navigation"

function UserComponent({role,username,id}:({role:string,username:string,id:string})) {


    const Router = useRouter()

    const handleNavigation = () => {
        Router.push(`/edit/${id}`)
    }

    const deleteItem = async (id:string) => {
        try {
          const res = await fetch('http://localhost:3000/api/users', {
            method:'DELETE',
            headers: {
              'Content-Type':'application/users'
            },
            body: JSON.stringify({ id })
          })
    
          if (!res.ok) {
            throw new Error("No deletion")
          }
        }
        catch(err){
          console.log(err)
        } 
      }
    


    return (
        <div className="flex bottom-b-gray-700 m-4 border-b-2 border-blue-950 pb-2 border-t-2">
           
            <h1>{username}</h1>
            <div className="buttons ml-auto flex space-x-2 flex-col space-y-2">
                <button className="bg-blue-950 text-white p-1 rounded my-2" onClick={handleNavigation}>Edit {role}</button>
                <button className="bg-blue-950 text-white p-2 rounded my-2" onClick={() => deleteItem(id)}>Delete {role}</button>
            </div>
        </div>
    )

}

export default UserComponent