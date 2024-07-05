import { useState,useEffect } from 'react'
import { PhotoIcon} from '@heroicons/react/24/solid'
import {useNavigate} from 'react-router-dom'



export default function Profile() {
const [userId,setUserId]   = useState('')
const [user,setUser]   = useState('')
const [fName,setfName] = useState('')
const [lName,setlName] = useState('')
const [email,setEmai] = useState('')
const [mission,setMission] = useState('')
const [profession,setProfession] = useState('')
const [phoneNumber,setPhoneNumber] = useState('')
const [nin,setNin] = useState('')
const [municipality,setMunicipality] = useState('')
const [district,setDistrict] = useState('Wakiso')
const [region,setRegion] = useState('')
const [message,setMessage]  = useState('')
const [division,setDivision] = useState('')
const [Notification,setNotification] = useState(false)
const [noNotification,setNoNotification] = useState(false)
const navigate = useNavigate('')
const getUser = async()=>{
      let result = await fetch('http://localhost:5000/user',{
        method:"GET",
        credentials: 'include'
      })

result = await result.json();
setUser(result.user)
setUserId(result.user._id)
setfName(result.user.first_name)
setlName(result.user.last_name)
setEmai(result.user.username)


}

useEffect(()=>{
  getUser();
})



const handleUpdateUser =async (e)=>{
  e.preventDefault()
  let result = await fetch(`http://localhost:5000/update-user/${userId}`,{
    method:"POST",
    body:JSON.stringify({fName,lName,profession,email,nin,phoneNumber,district,municipality,division,region,mission,Notification,noNotification}),
    headers:{
      'Content-Type':"application/json"
    },
    credentials:'include'
  })
  result = await result.json()
  if (result.message==="ok"){
    navigate('/')
  }
  else{
    setMessage('Couldnot update the profile details')
  }
  
}

  return (
    <form onSubmit={handleUpdateUser} className='m-[30px]'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Your  information will be kept confidential.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Profession
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    name="profession"
                    id="profession"
                    onChange={(e)=>{
                      setProfession(e.target.value)
                    }}
                    value={profession}
                    autoComplete="profession"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="e.g Doctor"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Finacial goal
              </label>
              <div className="mt-2">
                <textarea
                  id="mission"
                  name="mission"
                  rows={3}
                  onChange={(e)=>{
                    setMission(e.target.value)
                  }}
                  value={mission}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write your finacial goal</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
              <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                NIN
              </label>
              <div className="mt-2">
                <input
                  id="nin"
                  name="nin"
                  type="text"
                  onChange={(e)=>{
                    setNin(e.target.value)
                  }}
                  value={nin}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={user.first_name}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                readOnly
               />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={user.last_name}
                  readOnly
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={user.username}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                District
              </label>
              <div className="mt-2">
                <select
                  id="district"
                  name="district"
                  value={district}
                  onChange={(e)=>{
                    setDistrict(e.target.value)
                  }}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={'Wakiso'}>Wakiso</option>
                  <option value={'Kampala'}>Kampala</option>
                  <option value={'Masaka'}>Mukono</option>
                  <option value={'Mukono'}>Mukono</option>
                  <option value={'Mbale'}>Mbale</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Municipality
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="municipality"
                  id="municipality"
                  onChange={(e)=>{
                    setMunicipality(e.target.value)
                  }}
                  value={municipality}
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Division
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="division"
                  id="division"
                  onChange={(e)=>{
                    setDivision(e.target.value)
                  }}
                  value={division}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                LC1/Place of Residence
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  value={region}
                  onChange={(e)=>{
                    setRegion(e.target.value)
                  }}
                  autoC
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={(e)=>{
                    setPhoneNumber(e.target.value)
                  }}
                  value={phoneNumber}
                  autoC
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="Notification"
                      type="checkbox"
                      value={Notification}
                      onClick={(e)=>{
                        setNotification(true)
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Transcations
                    </label>
                    <p className="text-gray-500">Get notified when  you transact</p>
                  </div>
                </div>
                
                 
              
              </div>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Sms</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="noNotification"
                      type="checkbox"
                      value={noNotification}
                      onClick={(e)=>{
                        setNoNotification(true)
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Transcations
                    </label>
                    <p className="text-gray-500">Get notified when  you transact</p>
                  </div>
                </div>
                
                 
              
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  )
}

