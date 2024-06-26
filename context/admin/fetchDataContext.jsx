"use client"
import React, { createContext, useState,useContext,useEffect} from 'react';
import { getDocs,collection,query,where,orderBy,getDoc, doc} from 'firebase/firestore';
import { db } from "@/firebase/firebase-config"
import {subDays } from "date-fns"

export const AppContext = createContext();

// Create the provider component
export const  FetchDataProvider = ({ children }) => {
  const [date, setDate] = useState({
    from: subDays(new Date(), 30), // 30 days ago
    to: new Date(), // Today's date
  });
  const [profile, setProfile] = useState([]);
  const [levels, setLevels] = useState([]);
  const [parents,setParents]=useState([])
  const [students,setStudents]=useState([]);
  const [teachers,setTeachers]=useState([]);
  const [classes,setClasses]=useState([])
  const [invoices,setInvoices]=useState({})
  const [analytics,setAnalytics]=useState({})
  const [teachersSalary,setTeachersSalary]=useState([]);
  const [payouts,setPayouts]=useState([]);
  useEffect(()=>{
    const getAnalytics=async()=>{
      try {
        const PayoutsSnapshot = await getDoc(doc(db, "Billing","analytics"));
        const otherPayoutsSnapShot= await getDoc(doc(db, "Billing","payouts"));
      
        console.log("wedwe",PayoutsSnapshot.data());
     
       
     
          //console.table(parentsData);
        setAnalytics({...PayoutsSnapshot.data(),...otherPayoutsSnapShot.data()})
      } catch (error) {
        console.error('Error fetching Payouts:', error);
      }
    };
    getAnalytics()
  },[])
  console.log("analustucsss", analytics);
  useEffect(() => {
    const getPayouts = async () => {
      try {
        const PayoutsSnapshot = await getDocs(
          query(
            collection(db, "Billing", "payouts", "Payout"),
            where("paymentDate", ">=", date.from),
            where("paymentDate", "<=", date.to)
          )
        );
  
        const PayoutsData = PayoutsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          paymentDate: new Date(doc.data().paymentDate.toDate()),
          payment: doc.id,
          value: doc.id,
          label: doc.id
        }));
  
        setPayouts(PayoutsData);
      } catch (error) {
        console.error('Error fetching Payouts:', error);
      }
    };
  
    getPayouts();
  }, [date]);
  useEffect(() => {
    const getTeachersSalary = async () => {
      try {
        const teachersSalarySnapshot = await getDocs(
          query(
            collection(db, "Billing", "payouts", "TeachersTransactions"),
            where("salaryDate", ">=", date.from),
            where("salaryDate", "<=", date.to)
          )
        );
  
        const TeachersSalaryData = teachersSalarySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          salaryDate: new Date(doc.data().salaryDate.toDate()),
          value: doc.id,
          label: doc.id,
          teacherSalary: doc.id
        }));
  
        setTeachersSalary(TeachersSalaryData);
      } catch (error) {
        console.error('Error fetching Teachers:', error);
      }
    };
  
    getTeachersSalary();
  }, [date]);
  useEffect(() => {
    const getInvoices = async () => {
      try {
        const invoicesSnapshot = await getDocs(
          query(
            collection(db, 'Billing', "payments", "Invoices"),
            where("paymentDate", ">=", date.from),
            where("paymentDate", "<=", date.to)
          )
        );
  
        const invoicesData = invoicesSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          value: doc.id,
          label: doc.id,
          invoice: doc.id,
          paymentDate: new Date(doc.data().paymentDate.toDate())
        }));
  
        setInvoices(invoicesData);
      } catch (error) {
        console.error('Error fetching Invoices:', error);
      }
    };
  
    getInvoices();
  }, [date]);
  useEffect(()=>{
    const getClasses = async () => {
      try {
        const classesSnapshot = await getDocs(collection(db, 'Classes'));
      
        const classesData = classesSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           value:doc.data().className,
           label:doc.data().className,
          }))
       
     
          //console.table(parentsData);
        setClasses(classesData)
      } catch (error) {
        console.error('Error fetching Teachers:', error);
      }
    };
getClasses()
  },[])
  useEffect(()=>{
    const getTeachers = async () => {
      try {
        const teachersSnapshot = await getDocs(collection(db, 'Teachers'));
      
        const TeachersData = teachersSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           dateOfBirth:new Date(doc.data().dateOfBirth.toDate()),
           joiningDate:new Date(doc.data().joiningDate.toDate()),
           teacher: `${doc.data().firstName} ${doc.data().lastName}`,
           value: `${doc.data().firstName} ${doc.data().lastName}`,
           label: `${doc.data().firstName} ${doc.data().lastName}`,}))
       
     
          //console.table(parentsData);
        setTeachers(TeachersData)
      } catch (error) {
        console.error('Error fetching Teachers:', error);
      }
    };
    getTeachers();
  },[])
  console.log("hello youcef cv ? ");
  useEffect(()=>{
    const getStudents = async () => {
      try {
        const studentSnapshot = await getDocs(collection(db, 'Students'));
      
        const StudentsData = studentSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           dateOfBirth:new Date(doc.data().dateOfBirth.toDate()),
           joiningDate:new Date(doc.data().joiningDate.toDate()),
           lastPaymentDate:new Date(doc.data().joiningDate.toDate()),
           nextPaymentDate:new Date(doc.data().nextPaymentDate.toDate()),
           startDate:new Date(doc.data().joiningDate.toDate()),
           student: `${doc.data().firstName} ${doc.data().lastName}`,
           value: `${doc.data().firstName} ${doc.data().lastName}`,
           label: `${doc.data().firstName} ${doc.data().lastName}`,
          
        }))
setStudents(StudentsData)
       
      } catch (error) {
        console.error('Error fetching Students:', error);
      }
    };
    
    getStudents(); 
  },[])

  useEffect(() => {
    const getLevels = async () => {
      try {
        const levelsSnapshot = await getDocs(collection(db, 'Levels'));
      
        const levelsData = levelsSnapshot.docs.map((doc) => ({ ...doc.data(),
           value:doc.data().level,
           label:doc.data().level,
           id: doc.id,
           start:new Date(doc.data().start.toDate()),
           end:new Date(doc.data().end.toDate()),
           registrationDeadline:new Date(doc.data().registrationDeadline.toDate())}));
   
        setLevels(levelsData);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };
    const getParents = async () => {
      try {
        const parentsSnapshot = await getDocs(collection(db, 'Parents'));
      
        const parentsData = parentsSnapshot.docs.map((doc) => ({ ...doc.data(),
           id: doc.id,
           dateOfBirth:new Date(doc.data().dateOfBirth.toDate()),
           parent: `${doc.data().firstName} ${doc.data().lastName}`,
           value: `${doc.data().firstName} ${doc.data().lastName}`,
           label: `${doc.data().firstName} ${doc.data().lastName}`,

          }))
       
        setParents(parentsData)
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };
    getLevels();
    getParents();
  }, []);
  useEffect(() => { 
    const getProfile = async () => {
      try {
        const profileSnapshot = await getDoc(doc(db, 'Profile','GeneralInformation'));
      
        
           
        setProfile({...profileSnapshot.data(),id:profileSnapshot.id})
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    getProfile();
  }, []);
  return (
    <AppContext.Provider value={{levels,setLevels,setParents,parents,profile,setProfile,students,setStudents,teachers,setTeachers,classes,setClasses,invoices,setInvoices,analytics,setAnalytics,teachersSalary,setTeachersSalary,payouts,setPayouts,date,setDate}}>
      {children}
    </AppContext.Provider>
  );
};
export const  useData =()=>{


 
    const value=useContext(AppContext)
    try{
    if(!value){
        throw new Error("Error not wrapped inside layout  ",)
    }   }catch(e){
        console.log(e);
    }
    return value
}
