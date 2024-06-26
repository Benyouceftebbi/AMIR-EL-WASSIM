"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DataTableDemo } from "./components/table"
import StudentForm from "./components/studentForm"
import { useState } from "react"
import {useTranslations} from "next-intl"
import { useData } from "@/context/admin/fetchDataContext";
import StudentPaymentForm from "../billing/components/studentPayment/components/studentPaymentForm"
function Dashboard() {
  const [filter,setFilter]=useState("All")
  const t=useTranslations()
  const {students,classes,profile,levels}= useData()
  const handleFilter = (classType) => {
        setFilter(classType)
  };
  return (
  
    <div className="flex-1 space-y-4 p-4 pt-6">
<main className="flex flex-col lg:flex-row flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
  <div className="grid auto-rows-max items-start gap-4 md:gap-8  gridlg:w-8/12 ">
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all" onClick={() => handleFilter("All")}>{t('all')}</TabsTrigger>
          {levels.map((level) => (
            <TabsTrigger key={level.level} value={level.level} onClick={() => handleFilter(level.level)}>
              {level.level}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
       <DataTableDemo filter={filter}/> 

    </Tabs>
  </div>
  <div className="lg:flex-grow">
    <Tabs defaultValue="createPayment">
      <TabsList>
        <TabsTrigger value="createPayment">{t('create-payment')}</TabsTrigger>
        <TabsTrigger value="createStudent">{t('create-student-0')}</TabsTrigger>
      </TabsList>
      <TabsContent value="createPayment" className="space-y-4">
        <StudentPaymentForm />
      </TabsContent>
      <TabsContent value="createStudent" className="space-y-4">
        <StudentForm />
      </TabsContent>
    </Tabs>
  </div>
</main>
      </div>


  )
}
export default Dashboard