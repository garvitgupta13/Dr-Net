## Backend Documentation

### UserRoutes `/api/users`

| Type     | Route           | Body                                                                                               |
| :------- | :-------------- | :------------------------------------------------------------------------------------------------- |
| **POST** | /doctor/signin  | email,password (minLength=6)                                                                       |
| **POST** | /patient/signin | email,password (minLength=6)                                                                       |
| **POST** | /doctor/signup  | name,email,password,confirmPassword,domain,yearsOfExperience(int), education(string),fees(int),bio |
| **POST** | /patient/signup | name,email,password,confirmPassword,age,height,weight,bloodType,education,diseaseDescription       |

### DoctorRoutes `/api/doctor`

| Type     | Route                            | Description                                                           | Body                                                                | Header                          |
| :------- | :------------------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------ | :------------------------------ |
| **GET**  | /                                | getAllDoctors                                                         |                                                                     |                                 |
| **GET**  | /doctorId                        | getDoctor with doctorId                                               |                                                                     |                                 |
| **PUT**  | /doctorId                        | Update doctor with doctorId                                           | name,domain,yearsOfExperience(int), education(string),fees(int),bio | (**Authorization**,doctorToken) |
| **PUT**  | /consultation/doctorId/patientId | Doctor with doctorId adding consulation for patient with id patientId | prescription,disease, recommendedTests                              | (**Authorization**,doctorToken) |
| **POST** | /review/doctorId                 | add feedback to doctor with doctorId                                  | reviewerId(patientId),feedback,rating                               |                                 |

### PatientRoutes `/api/patient`

| Type    | Route      | Description                   | Body                                                          | Header                           |
| :------ | :--------- | :---------------------------- | :------------------------------------------------------------ | :------------------------------- |
| **GET** | /          | getAll patients               |                                                               | (**Authorization**,patientToken) |
| **GET** | /patientId | getDoctor with patientId      |                                                               | (**Authorization**,patientToken) |
| **PUT** | /patientId | Update patient with patientId | name,age,height,weight,bloodType,education,diseaseDescription | (**Authorization**,patientToken) |

### Conversation Routes `/api/conversation`
| Type    | Route      | Description                                   | Body  | Header                           |
| :------ | :--------- | :-------------------------------------------- | :---- | :------------------------------- |
| **GET** | /          | getAll Conversation of logged in User         |       | (**Authorization**,patientToken) |
| **POST**| /doctorId  | Add Conversation of logged in User with doctor|       | (**Authorization**,patientToken) |
| **PUT** | /conversationId  | End Conversation of logged in User with doctor|       | (**Authorization**,patientToken) |


### Message Routes `/api/messages`
| Type     | Route           | Description                    | Body        | Header                           |
| :------- | :-------------- | :----------------------------- | :---------- | :------------------------------- |
| **GET**  | /conversationId | getAll messages of conversation|             |  (**Authorization**,patientToken)|
| **POST** | /conversationId | Add mesage to conversation     | text(string)|  (**Authorization**,patientToken)|

**doctorToken**: token recieved after doctor logs in

**patientToken**: token recieved after patient logs in
