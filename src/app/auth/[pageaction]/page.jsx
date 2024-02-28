"use client"
import MainPage from '../page'

const page = ({params}) => {
    // console.log(params.pageaction)
    return <>
        <MainPage pageAction={params.pageaction}></MainPage>
    </>;
}

export default page;