/* eslint-disable @next/next/no-img-element */
export default function Loading(){
    return (
        <div 
            className=" select-none w-full h-full min-h-100 flex justify-center self-center items-center justify-self-center"
        >
            <img className="" src="/loadingEFF.gif" alt="" />
            <h2>Page is Loading</h2>
        </div>
    )
}