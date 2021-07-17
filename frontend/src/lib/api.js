const NODE_DOMAIN = 'http://localhost:5000/api';

export async function getDoctors() {

    const response = await fetch(`${NODE_DOMAIN}/doctor`);

    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || 'Could not fetch doctors');
    }


    // const transformedDoctors = [];
    //
    // for(const key in data){
    //    const doctorObj = {
    //      id: key,
    //      ...data[key],
    //    };
    //
    //    transformedDoctors.push(doctorObj);
    // }

   return data.data;

}
