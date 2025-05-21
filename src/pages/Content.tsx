
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Search,
  Edit,
  Trash2,
  Eye,
  FilePlus,
  CheckCircle2,
  Clock,
  AlarmClock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Content = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock content data
  const contentItems = [
    {
      id: "1",
      title: "Getting Started with Admin Panel",
      type: "Article",
      status: "Published",
      author: "Alice Johnson",
      created: "2023-05-10",
      views: 1247,
    },
    {
      id: "2",
      title: "Advanced User Management",
      type: "Tutorial",
      status: "Draft",
      author: "Bob Smith",
      created: "2023-05-09",
      views: 0,
    },
    {
      id: "3",
      title: "Content Management Best Practices",
      type: "Guide",
      status: "Review",
      author: "Carol Williams",
      created: "2023-05-08",
      views: 543,
    },
    {
      id: "4",
      title: "Analytics Dashboard Overview",
      type: "Video",
      status: "Published",
      author: "Dave Brown",
      created: "2023-05-07",
      views: 892,
    },
    {
      id: "5",
      title: "Security Considerations",
      type: "Article",
      status: "Published",
      author: "Eve Davis",
      created: "2023-05-06",
      views: 632,
    },
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Published":
        return "default";
      case "Draft":
        return "secondary";
      case "Review":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Published":
        return <CheckCircle2 className="h-3 w-3 mr-1" />;
      case "Draft":
        return <Clock className="h-3 w-3 mr-1" />;
      case "Review":
        return <AlarmClock className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Article":
        return "secondary";
      case "Tutorial":
        return "outline";
      case "Guide":
        return "destructive";
      case "Video":
        return "default";
      default:
        return "secondary";
    }
  };

  const handleDeleteContent = (contentId: string, contentTitle: string) => {
    toast({
      title: "Content deleted",
      description: `"${contentTitle}" has been removed.`,
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter content based on search term
  const filteredContent = contentItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content</h1>
          <p className="text-muted-foreground">
            Manage your articles, tutorials, and other content.
          </p>
        </div>
        <Button className="sm:w-auto w-full">
          <FilePlus className="h-4 w-4 mr-2" />
          New Content
        </Button>
      </div>

      <div className="bg-card rounded-md border border-border shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row gap-4 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(item.type)}>
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{formatDate(item.created)}</TableCell>
                  <TableCell>
                    {item.views > 0 ? item.views.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => handleDeleteContent(item.id, item.title)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredContent.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No content found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Content;
