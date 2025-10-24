import React, { useState, useEffect } from 'react'
import CreateProjectModal from '../components/dashboard/CreateProjectModal'
import api from '../services/api'
import { Button } from "../components/ui/button"

const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchProjects = async () => {
    try {
      const res = await api.get('/project')
      setProjects(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setModalOpen(true)}>+ Create New Project</Button>
      </div>

      {/* Project List */}
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((p) => (
            <div key={p._id} className="p-4 border rounded">
              <h3 className="font-bold">{p.name}</h3>
              <p>{p.description}</p>
              <p>Status: {p.status}</p>
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchProjects} // refresh list
      />
    </div>
  )
}

export default Dashboard
