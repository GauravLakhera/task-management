import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'react-hot-toast';
import api from '@/services/api';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    type: 'Task',
    priority: 'MEDIUM'
  });

  const fetchProject = async () => {
    try {
      const res = await api.get(`/project/${projectId}`);
      setProject(res.data.data);
    } catch (err) {
      console.error('Error fetching project details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const handleCreateTask = async () => {
    if (!taskData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    try {
      const payload = {
        ...taskData,
        projectId: projectId
      };
      await api.post('/issue', payload);
      toast.success('Task created successfully');
      setOpenTaskModal(false);
      setTaskData({
        title: '',
        description: '',
        type: 'Task',
        priority: 'MEDIUM'
      });
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  if (loading) return <p className='p-6'>Loading project details...</p>;
  if (!project) return <p className='p-6'>Project not found.</p>;

  const renderUserCard = (title, user) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center space-x-3'>
        <div
          className='h-10 w-10 flex items-center justify-center rounded-full text-white font-semibold text-sm'
          style={{ backgroundColor: user?.profileColor || '#999' }}
        >
          {user?.firstName?.[0] || '?'}
        </div>
        <div>
          <p className='font-medium'>
            {user?.firstName} {user?.lastName}
          </p>
          <p className='text-sm text-gray-500'>{user?.email}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='p-6 space-y-8 md:w-10/12 mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='text-3xl font-bold mb-1 flex items-center gap-3'>
            {project.projectIcon ? (
              <img
                src={project.projectIcon}
                alt='icon'
                className='w-8 h-8 rounded'
              />
            ) : (
              <span className='inline-flex items-center justify-center w-8 h-8 rounded bg-gray-200 text-gray-700 font-semibold'>
                {project.key?.[0] || '?'}
              </span>
            )}
            {project.name}
          </h1>
          <p className='text-gray-600 max-w-2xl'>{project.description}</p>
        </div>
        <Button variant='outline' onClick={() => navigate('/dashboard')}>
          ← Back
        </Button>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3'>
        <Dialog open={openTaskModal} onOpenChange={setOpenTaskModal}>
          <DialogTrigger asChild>
            <Button>Create Task</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
            </DialogHeader>

            <div className='space-y-4 py-2'>
              <div>
                <label className='text-sm font-medium'>Title</label>
                <Input
                  value={taskData.title}
                  onChange={(e) =>
                    setTaskData({ ...taskData, title: e.target.value })
                  }
                  placeholder='Enter task title'
                />
              </div>

              <div>
                <label className='text-sm font-medium'>Description</label>
                <Textarea
                  value={taskData.description}
                  onChange={(e) =>
                    setTaskData({ ...taskData, description: e.target.value })
                  }
                  placeholder='Enter task description'
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => setOpenTaskModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant='secondary'>Add Member</Button>
      </div>

      {/* Project Info */}
      <div className='grid md:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={`capitalize px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : project.status === 'on-hold'
                    ? 'bg-yellow-100 text-yellow-700'
                    : project.status === 'completed'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
              }`}
            >
              {project.status}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Key</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-lg font-semibold'>{project.key}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issue Sequence</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{project.issueSeq || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* People Section */}
      <div className='grid md:grid-cols-2 gap-4'>
        {renderUserCard('Manager', project.manager)}
        {renderUserCard('Default Assignee', project.defaultAssignee)}
      </div>

      {/* Dates */}
      <div className='grid md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Start Date:</strong>{' '}
              {project.startDate
                ? new Date(project.startDate).toLocaleDateString()
                : '—'}
            </p>
            <p>
              <strong>End Date:</strong>{' '}
              {project.endDate
                ? new Date(project.endDate).toLocaleDateString()
                : '—'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Created & Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Created:</strong>{' '}
              {new Date(project.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated:</strong>{' '}
              {new Date(project.updatedAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Created By / Updated By */}
      <div className='grid md:grid-cols-2 gap-4'>
        {renderUserCard('Created By', project.createdBy)}
        {renderUserCard('Last Updated By', project.updatedBy)}
      </div>
    </div>
  );
};

export default ProjectDetails;
