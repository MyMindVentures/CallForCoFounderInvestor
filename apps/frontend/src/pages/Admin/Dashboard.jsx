import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logger from '@/utils/logger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, FileText, MessageSquare, DollarSign, Save, Loader2,
  TrendingUp, Users, Calendar, Check, X, Image, Video, User, 
  Network, Link2, Plus, Trash2, ExternalLink
} from 'lucide-react';
import { PageTransition } from '@/components/ui/page-transition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea, Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import FileUpload from '@/components/FileUpload';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('content');
  const [messages, setMessages] = useState([]);
  const [donations, setDonations] = useState(null);
  const [selectedPage, setSelectedPage] = useState('storytelling');
  const [pageContent, setPageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState({});
  const [appProjects, setAppProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', url: '', description: '' });
  const navigate = useNavigate();

  const pages = [
    { id: 'storytelling', name: 'Storytelling' },
    { id: 'whatILookFor', name: 'What I Look For' },
    { id: 'developerHelp', name: 'Developer Help' },
    { id: 'financialHelp', name: 'Financial Help' },
    { id: 'support', name: 'Support' },
    { id: 'adhDAries', name: 'ADHD + Aries' }
  ];

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: messages.length },
    { id: 'donations', label: 'Donations', icon: DollarSign }
  ];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (activeTab === 'messages') {
      fetchMessages();
    } else if (activeTab === 'donations') {
      fetchDonations();
    } else if (activeTab === 'content') {
      fetchContent(selectedPage);
    } else if (activeTab === 'media') {
      fetchMedia();
      fetchAppProjects();
    }
  }, [activeTab, selectedPage, navigate]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      logger.error('Error fetching messages:', error);
      if (error.response?.status === 401) navigate('/admin/login');
    }
  };

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/donations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(response.data);
    } catch (error) {
      logger.error('Error fetching donations:', error);
      if (error.response?.status === 401) navigate('/admin/login');
    }
  };

  const fetchContent = async (pageId) => {
    try {
      const response = await axios.get(`/api/content/${pageId}`);
      setPageContent(response.data.content);
    } catch (error) {
      logger.error('Error fetching content:', error);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await axios.get('/api/media/all');
      setMedia(response.data);
    } catch (error) {
      logger.error('Error fetching media:', error);
    }
  };

  const fetchAppProjects = async () => {
    try {
      const response = await axios.get('/api/media/projects');
      setAppProjects(response.data);
    } catch (error) {
      logger.error('Error fetching app projects:', error);
    }
  };

  const handleMediaUpload = async (file, mediaType) => {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`/api/media/upload/${mediaType}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    // Update local state with new media
    setMedia(prev => ({
      ...prev,
      [mediaType]: response.data.media
    }));

    return response.data;
  };

  const handleMediaDelete = async (mediaType) => {
    const token = localStorage.getItem('adminToken');
    await axios.delete(`/api/media/${mediaType}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Update local state
    setMedia(prev => ({
      ...prev,
      [mediaType]: null
    }));
  };

  const handleAddProject = async () => {
    if (!newProject.name || !newProject.url) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('/api/media/projects', newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppProjects(prev => [...prev, response.data.project]);
      setNewProject({ name: '', url: '', description: '' });
    } catch (error) {
      logger.error('Error adding project:', error);
      alert('Error adding project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/media/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (error) {
      logger.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  const saveContent = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `/api/content/${selectedPage}`,
        { content: pageContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Content saved successfully!');
    } catch (error) {
      logger.error('Error saving content:', error);
      alert('Error saving content. Please try again.');
      if (error.response?.status === 401) navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const curateMessage = async (messageId, isPositive, isPublished) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `/api/messages/${messageId}/curate`,
        { isPositive, isPublished },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
    } catch (error) {
      logger.error('Error curating message:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  return (
    <PageTransition className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="glass" className="mb-6 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-gradient-secondary">
                Admin Dashboard
              </h1>
              <Button onClick={handleLogout} variant="destructive" size="default">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass" className="mb-6 p-2">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all min-h-[44px]',
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-dark-300/50'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                      <Badge variant="teal" size="sm">{tab.count}</Badge>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card variant="glass" size="lg">
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Select Page:
                    </label>
                    <select
                      value={selectedPage}
                      onChange={(e) => {
                        setSelectedPage(e.target.value);
                        fetchContent(e.target.value);
                      }}
                      className="w-full px-4 py-3 min-h-[44px] backdrop-blur-md bg-dark-200/60 border border-teal-500/20 rounded-xl text-gray-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                    >
                      {pages.map(page => (
                        <option key={page.id} value={page.id}>{page.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Content (HTML):
                    </label>
                    <Textarea
                      value={pageContent}
                      onChange={(e) => setPageContent(e.target.value)}
                      variant="default"
                      className="font-mono min-h-[300px]"
                      placeholder="Enter HTML content here..."
                    />
                  </div>

                  <Button
                    onClick={saveContent}
                    disabled={loading}
                    variant="default"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Content
                      </>
                    )}
                  </Button>

                  {pageContent && (
                    <div className="mt-6 p-4 backdrop-blur-md bg-dark-300/50 rounded-xl border border-dark-400/50">
                      <h3 className="font-semibold text-gray-300 mb-3">Preview:</h3>
                      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: pageContent }} />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Media Management</h2>
                  
                  {/* Videos Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Video className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-semibold text-gray-200">Videos</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FileUpload
                        type="video"
                        mediaType="video-story"
                        currentUrl={media['video-story']?.url}
                        onUpload={handleMediaUpload}
                        onDelete={handleMediaDelete}
                        title="My Story"
                        description="Video introducing your story"
                      />
                      <FileUpload
                        type="video"
                        mediaType="video-proposal"
                        currentUrl={media['video-proposal']?.url}
                        onUpload={handleMediaUpload}
                        onDelete={handleMediaDelete}
                        title="My Proposal"
                        description="Video presenting your proposal"
                      />
                      <FileUpload
                        type="video"
                        mediaType="video-proof"
                        currentUrl={media['video-proof']?.url}
                        onUpload={handleMediaUpload}
                        onDelete={handleMediaDelete}
                        title="Proof of Mind"
                        description="Video demonstrating your expertise"
                      />
                    </div>
                  </div>

                  {/* Profile & Mindmap Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <User className="w-6 h-6 text-teal-400" />
                      <h3 className="text-lg font-semibold text-gray-200">Profile & Mindmap</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileUpload
                        type="image"
                        mediaType="profile"
                        currentUrl={media['profile']?.url}
                        onUpload={handleMediaUpload}
                        onDelete={handleMediaDelete}
                        title="Profile Picture"
                        description="Your profile photo"
                      />
                      <FileUpload
                        type="image"
                        mediaType="mindmap"
                        currentUrl={media['mindmap']?.url}
                        onUpload={handleMediaUpload}
                        onDelete={handleMediaDelete}
                        title="Mindmap"
                        description="Your project mindmap or vision board"
                      />
                    </div>
                  </div>

                  {/* App Projects Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Link2 className="w-6 h-6 text-cyan-400" />
                      <h3 className="text-lg font-semibold text-gray-200">App Project URLs</h3>
                    </div>
                    
                    {/* Add new project */}
                    <div className="backdrop-blur-md bg-dark-300/50 rounded-xl p-5 border border-dark-400/50">
                      <h4 className="font-semibold text-gray-300 mb-4">Add New Project</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Input
                          placeholder="Project Name"
                          value={newProject.name}
                          onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <Input
                          placeholder="Project URL"
                          value={newProject.url}
                          onChange={(e) => setNewProject(prev => ({ ...prev, url: e.target.value }))}
                        />
                        <Input
                          placeholder="Description (optional)"
                          value={newProject.description}
                          onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <Button
                        onClick={handleAddProject}
                        disabled={!newProject.name || !newProject.url}
                        variant="default"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>

                    {/* Project list */}
                    {appProjects.length > 0 ? (
                      <div className="space-y-3">
                        {appProjects.map((project, index) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="backdrop-blur-md bg-dark-300/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-dark-400/50"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-100">{project.name}</h4>
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-teal-400 hover:text-teal-300"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                              <p className="text-sm text-gray-400 truncate">{project.url}</p>
                              {project.description && (
                                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                              )}
                            </div>
                            <Button
                              onClick={() => handleDeleteProject(project.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Network className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No app projects added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-100">All Messages</h2>
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No messages yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg, index) => (
                        <motion.div 
                          key={msg.id || msg._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="backdrop-blur-md bg-dark-300/50 rounded-xl p-5 border-l-4 border-purple-500"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <strong className="text-gray-100">{msg.name}</strong>
                              <span className="text-gray-400 text-sm">({msg.email})</span>
                              {msg.donationAmount && (
                                <Badge variant="warning">€{msg.donationAmount.toFixed(2)}</Badge>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(msg.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4 leading-relaxed">{msg.message}</p>
                          <div className="flex flex-wrap gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={msg.isPositive || false}
                                onChange={(e) => curateMessage(msg.id || msg._id, e.target.checked, msg.isPublished)}
                                className="w-4 h-4 rounded border-gray-600 bg-dark-300 text-teal-500 focus:ring-teal-500"
                              />
                              <span className="text-sm text-gray-300">Positive</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={msg.isPublished || false}
                                onChange={(e) => curateMessage(msg.id || msg._id, msg.isPositive, e.target.checked)}
                                className="w-4 h-4 rounded border-gray-600 bg-dark-300 text-teal-500 focus:ring-teal-500"
                              />
                              <span className="text-sm text-gray-300">Publish</span>
                            </label>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'donations' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-100">Donations Overview</h2>
                  {donations ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {[
                          { label: 'Total Donations', value: `€${donations.stats.total.toFixed(2)}`, icon: DollarSign, color: 'from-green-500/20 to-emerald-500/20 border-green-500/30', textColor: 'text-green-400' },
                          { label: 'Number of Donations', value: donations.stats.count, icon: Users, color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30', textColor: 'text-blue-400' },
                          { label: 'Average Donation', value: `€${donations.stats.average.toFixed(2)}`, icon: TrendingUp, color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30', textColor: 'text-purple-400' },
                        ].map((stat, index) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn('backdrop-blur-md bg-gradient-to-br', stat.color, 'rounded-xl p-5 border')}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <stat.icon className={cn('w-5 h-5', stat.textColor)} />
                              <h3 className="text-xs font-semibold text-gray-400 uppercase">{stat.label}</h3>
                            </div>
                            <p className={cn('text-2xl font-bold', stat.textColor)}>{stat.value}</p>
                          </motion.div>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold mb-4 text-gray-200">Recent Donations</h3>
                      {donations.donations.length === 0 ? (
                        <p className="text-gray-400">No donations yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {donations.donations.map((donation, index) => (
                            <motion.div
                              key={donation.id || donation._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="backdrop-blur-md bg-dark-300/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                  <DollarSign className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-100">{donation.donorName}</p>
                                  <p className="text-sm text-gray-400">{donation.donorEmail}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-lg font-bold text-green-400">€{donation.amount.toFixed(2)}</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(donation.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

export default AdminDashboard;
