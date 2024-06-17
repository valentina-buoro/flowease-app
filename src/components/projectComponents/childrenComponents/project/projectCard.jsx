import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'

const ProjectCard = ({data}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/projects/project-details/${data._id}`)} className='col-span-1 '>
        <div className='border rounded-md py-4 px-6 bg-[#ffffff] hover:bg-[#E9EDFF]'>
            <p className='font-medium text-[15px] '>{data.name}</p>
            <p className='text-xs text-[#4E4F52]'>Task: <span className='text-primaryGreen'>20</span><span>/{data.milestones.length}</span></p>
            <div>
                <p className='text-[#4E4F52] text-[10px]'> Progress:</p>
            <ProgressBar variant="success" now={40} />
            </div>
        </div>
    </div>
  )
}

export default ProjectCard