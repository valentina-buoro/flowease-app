import React from 'react'
import All from '../../../assets/svgs/allProject.svg'
import Ongoing from '../../../assets/svgs/ongoingProject.svg'
import Completed from '../../../assets/svgs/completedProject.svg'

const ProjectStats = ({data}) => {
    
  return (
    <div className='border-[1px] border-borderGrey rounded-[10px] bg-[#FFFFFF]'>
        <div className='flex w-full justify-between  h-[152px] p-5'>
            <div className='flex justify-between items-center'>
                <div className='mx-3'>
                    <img src={All} alt="profile" />
                </div>
                <div>
                    <p className='text-textGrey text-sm'>All Projects</p>
                    <p className='text-secondaryTextBlack text-2xl'>{data.assigned_projects.length + data.created_projects.length}</p>
                </div>
            </div>
            <div className='h-11/12 w-[1px] bg-secondaryBorderGrey'/>
            <div className=' flex justify-between  items-center'>
                <div className='mx-3'>
                <img src={Completed} alt="profile" />
                </div>
                <div>
                    <p className='text-textGrey text-sm'>Completed Projects</p>
                    <p className='text-secondaryTextBlack text-2xl'>-</p>
                </div>
            </div>
            <div className='h-11/12 w-[1px] bg-secondaryBorderGrey'/>
            <div className='flex justify-between  items-center' >
                <div className='mx-3'>
                <img src={Ongoing} alt="profile" />
                </div>
                <div>
                    <p className='text-textGrey text-sm'>Ongoing Projects</p>
                    <p className='text-secondaryTextBlack text-2xl'>-</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectStats