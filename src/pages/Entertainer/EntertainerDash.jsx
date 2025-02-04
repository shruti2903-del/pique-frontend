import React from 'react'
import DashLayoutEnter from '../../components/Entertainer/DashLayoutEnter'
import PiqueFooter from '../../components/PiqueComponents/PiqueFooter'

export default function EntertainerDash() {
  
  return (
        <>
           <DashLayoutEnter title="Entertainer Dashboard" description="View and manage your data">
        <div className="container-fluid d-flex flex-column min-vh-100 mt-5">

                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-secondary text-center">Entertainer Dashboard</h2>
                        </div>
                    </div>
              </div>
              <PiqueFooter/>
            </DashLayoutEnter>
        </>
    )
}
