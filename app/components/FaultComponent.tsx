"use client"
function FaultComponent({status,title,date,id}:({status:string,title:string,date:string,id:string})) {

  const dates = new Date(date).toLocaleDateString()

  const deleteItem = async (id:string) => {
    try {
      const res = await fetch('http://localhost:3000/api/faults', {
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
    <div className="flex bg-white border-b-2 border-blue-100 border-t-2">
      <h5 className="text-blue-950 mr-96 pr-3 m-5">{title}</h5>
      <h5 className="text-blue-950 mr-80 pl-14 pr-3 m-5">{dates}</h5>
      <h5 className="text-yellow-300 mr-32 ml m-5">{status}</h5>
      <button className="bg-blue-950 text-white mr-4 p-3 m-2 w-28 rounded">View</button>
      <button className="bg-blue-950 text-white p-3 w-28 m-2 rounded" onClick={() => deleteItem(id)}>Delete</button>
    </div>
  );
}

export default FaultComponent;