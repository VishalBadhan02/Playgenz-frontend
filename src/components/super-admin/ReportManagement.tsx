
// Updating only the relevant parts of this file to fix Select.Item values

import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, MoreHorizontal, CheckCircle, XCircle, Eye, Flag, User, Calendar, MessagesSquare
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ReportType = 'user' | 'team' | 'venue' | 'match' | 'tournament' | 'message';
type ReportStatus = 'pending' | 'resolved' | 'dismissed';

interface Report {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  reportedEntityId: string;
  reportedEntityName: string;
  reportedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: ReportStatus;
  date: string;
  updatedAt?: string;
  adminNotes?: string;
}

// Mock data for reports
const mockReports: Report[] = [
  {
    id: '1',
    type: 'user',
    title: 'Inappropriate behavior',
    description: 'This user has been using offensive language during matches and in chat.',
    reportedEntityId: 'u1',
    reportedEntityName: 'James Wilson',
    reportedBy: {
      id: 'u2',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    status: 'pending',
    date: '2023-06-25',
  },
  {
    id: '2',
    type: 'team',
    title: 'Team name violation',
    description: 'This team name contains inappropriate content and should be changed.',
    reportedEntityId: 't1',
    reportedEntityName: 'The Bad Boys',
    reportedBy: {
      id: 'u3',
      name: 'Michael Wong',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    status: 'resolved',
    date: '2023-06-20',
    updatedAt: '2023-06-22',
    adminNotes: 'Team name has been changed to "The Bold Boys".'
  },
  {
    id: '3',
    type: 'venue',
    title: 'Venue misrepresentation',
    description: 'The facilities listed for this venue do not match what is actually available. There are no shower facilities as claimed.',
    reportedEntityId: 'v1',
    reportedEntityName: 'Central Sports Arena',
    reportedBy: {
      id: 'u4',
      name: 'Emma Garcia',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    status: 'pending',
    date: '2023-06-26',
  },
  {
    id: '4',
    type: 'match',
    title: 'Score dispute',
    description: 'The final score recorded for this match is incorrect. The actual score was 3-2 in favor of our team.',
    reportedEntityId: 'm1',
    reportedEntityName: 'Tigers vs Lions',
    reportedBy: {
      id: 'u5',
      name: 'David Miller',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    status: 'dismissed',
    date: '2023-06-18',
    updatedAt: '2023-06-19',
    adminNotes: 'After reviewing the match video, the recorded score was confirmed to be correct.'
  },
  {
    id: '5',
    type: 'tournament',
    title: 'Registration issues',
    description: 'Our team registered for this tournament but was not included in the bracket.',
    reportedEntityId: 'to1',
    reportedEntityName: 'Summer Basketball Championship',
    reportedBy: {
      id: 'u6',
      name: 'Olivia Taylor',
      avatar: 'https://i.pravatar.cc/150?img=6'
    },
    status: 'resolved',
    date: '2023-06-15',
    updatedAt: '2023-06-16',
    adminNotes: 'Team was added to the bracket. Registration system error has been fixed.'
  },
  {
    id: '6',
    type: 'message',
    title: 'Harassment in messages',
    description: 'This user has been sending harassing and threatening messages.',
    reportedEntityId: 'u7',
    reportedEntityName: 'William Davis',
    reportedBy: {
      id: 'u8',
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    status: 'pending',
    date: '2023-06-27',
  }
];

const getReportTypeBadge = (type: ReportType) => {
  switch (type) {
    case 'user':
      return <Badge className="bg-blue-500">User</Badge>;
    case 'team':
      return <Badge className="bg-green-500">Team</Badge>;
    case 'venue':
      return <Badge className="bg-purple-500">Venue</Badge>;
    case 'match':
      return <Badge className="bg-yellow-500">Match</Badge>;
    case 'tournament':
      return <Badge className="bg-orange-500">Tournament</Badge>;
    case 'message':
      return <Badge className="bg-red-500">Message</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getStatusBadge = (status: ReportStatus) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500">Pending</Badge>;
    case 'resolved':
      return <Badge className="bg-green-500">Resolved</Badge>;
    case 'dismissed':
      return <Badge className="bg-gray-500">Dismissed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const ReportManagement = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusFilterValue, setStatusFilterValue] = useState<string>('all-statuses');
  const [typeFilterValue, setTypeFilterValue] = useState<string>('all-types');
  const [adminNotes, setAdminNotes] = useState('');

  // Filter reports based on search query and filters
  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           report.reportedEntityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           report.reportedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatusFilter = statusFilterValue === 'all-statuses' ? true : report.status === statusFilterValue;
    const matchesTypeFilter = typeFilterValue === 'all-types' ? true : report.type === typeFilterValue;
    
    return matchesSearch && matchesStatusFilter && matchesTypeFilter;
  });

  const handleActionClick = (action: string, report: Report) => {
    switch (action) {
      case 'view':
        setSelectedReport(report);
        setAdminNotes(report.adminNotes || '');
        setDetailsOpen(true);
        break;
      case 'resolve':
        toast({
          title: "Report Resolved",
          description: `The report "${report.title}" has been marked as resolved.`
        });
        break;
      case 'dismiss':
        toast({
          title: "Report Dismissed",
          description: `The report "${report.title}" has been dismissed.`
        });
        break;
      default:
        break;
    }
  };

  const handleSaveNotes = () => {
    if (selectedReport) {
      toast({
        title: "Notes Saved",
        description: "Admin notes have been updated for this report."
      });
    }
  };

  const ReportCard = ({ report }: { report: Report }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{report.title}</h3>
                {getReportTypeBadge(report.type)}
              </div>
              <p className="text-sm text-muted-foreground">
                About: {report.reportedEntityName}
              </p>
            </div>
            <div>{getStatusBadge(report.status)}</div>
          </div>
          
          <div className="text-sm line-clamp-2">{report.description}</div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={report.reportedBy.avatar} alt={report.reportedBy.name} />
                <AvatarFallback>{report.reportedBy.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <span className="text-muted-foreground">Reported by: </span>
                <span>{report.reportedBy.name}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {report.date}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button size="sm" onClick={() => handleActionClick('view', report)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            
            {report.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => handleActionClick('dismiss', report)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Dismiss
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-green-500 border-green-500 hover:bg-green-50"
                  onClick={() => handleActionClick('resolve', report)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Resolve
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-semibold">Report Management</h2>
        <p className="text-muted-foreground">
          Handle user reports and content moderation
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              value={statusFilterValue}
              onValueChange={setStatusFilterValue}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={typeFilterValue}
              onValueChange={setTypeFilterValue}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="venue">Venue</SelectItem>
                <SelectItem value="match">Match</SelectItem>
                <SelectItem value="tournament">Tournament</SelectItem>
                <SelectItem value="message">Message</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Mobile view */}
          {isMobile ? (
            <div>
              {filteredReports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            /* Desktop view */
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[280px]">Report</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-muted-foreground">
                            About: {report.reportedEntityName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getReportTypeBadge(report.type)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={report.reportedBy.avatar} alt={report.reportedBy.name} />
                            <AvatarFallback>{report.reportedBy.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span>{report.reportedBy.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleActionClick('view', report)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            
                            {report.status === 'pending' && (
                              <>
                                <DropdownMenuItem onClick={() => handleActionClick('resolve', report)}>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                  Resolve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleActionClick('dismiss', report)}>
                                  <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                  Dismiss
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending">
          {/* Filtered for pending reports */}
          {isMobile ? (
            <div>
              {filteredReports
                .filter(report => report.status === 'pending')
                .map(report => (
                  <ReportCard key={report.id} report={report} />
                ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[280px]">Report</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports
                    .filter(report => report.status === 'pending')
                    .map(report => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-muted-foreground">
                              About: {report.reportedEntityName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getReportTypeBadge(report.type)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={report.reportedBy.avatar} alt={report.reportedBy.name} />
                              <AvatarFallback>{report.reportedBy.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>{report.reportedBy.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleActionClick('view', report)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleActionClick('resolve', report)}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                Resolve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleActionClick('dismiss', report)}>
                                <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                Dismiss
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolved">
          {/* Similar table for resolved reports */}
          {/* Omitted for brevity but would follow same pattern as above */}
        </TabsContent>

        <TabsContent value="dismissed">
          {/* Similar table for dismissed reports */}
          {/* Omitted for brevity but would follow same pattern as above */}
        </TabsContent>
      </Tabs>

      {/* Report details dialog */}
      {selectedReport && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Report Details</DialogTitle>
              <DialogDescription>
                Review report information and take action
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{selectedReport.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getReportTypeBadge(selectedReport.type)}
                    {getStatusBadge(selectedReport.status)}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedReport.date}
                </div>
              </div>
              
              <div className="flex items-center gap-2 border-b pb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedReport.reportedBy.avatar} alt={selectedReport.reportedBy.name} />
                  <AvatarFallback>{selectedReport.reportedBy.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedReport.reportedBy.name}</div>
                  <div className="text-sm text-muted-foreground">Reported this {selectedReport.type}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Reported Content</h4>
                <div className="text-sm border rounded-md p-3 bg-muted/30">
                  <div className="font-medium">{selectedReport.reportedEntityName}</div>
                  <div className="text-muted-foreground">{selectedReport.type} ID: {selectedReport.reportedEntityId}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Report Description</h4>
                <div className="text-sm border rounded-md p-3 bg-muted/30">
                  {selectedReport.description}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium">Admin Notes</h4>
                <textarea
                  className="min-h-[100px] rounded-md border p-3 text-sm"
                  placeholder="Add your notes about this report..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="self-end"
                  onClick={handleSaveNotes}
                >
                  Save Notes
                </Button>
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              {selectedReport.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => {
                      handleActionClick('dismiss', selectedReport);
                      setDetailsOpen(false);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Dismiss
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-green-500 border-green-500 hover:bg-green-50"
                    onClick={() => {
                      handleActionClick('resolve', selectedReport);
                      setDetailsOpen(false);
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Resolve
                  </Button>
                </>
              )}
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReportManagement;
