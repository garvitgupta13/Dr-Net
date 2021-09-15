import axios from "axios";
export function submitConsultant(consultInfo,doctorId,patientId) {
    try{

      const header = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
      };

      const { data: response } = axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/doctor/consultation/${doctorId}/${patientId}`,  // FILL THIS
        consultInfo,
        header
      );

       return response;
    }
    catch(exception){
      return null;
    }
}
