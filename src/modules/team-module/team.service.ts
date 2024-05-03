/*
https://docs.nestjs.com/providers#services
*/

import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BaseService} from 'src/global-utils/base.service';
import { Team} from 'src/schemas/team.schema';
import {CreateTeamDto} from "./dto/createTeam.dto";
import {UpdateTeamDto} from "./dto/updateTeam.dto";
import {User} from "../../schemas/user.schema";
import {Project} from "../../schemas/project.schema";
import {Task} from 'src/schemas/task.schema';
import {NotificationService} from "../notification/notification.service";
import {Notification} from "../../schemas/notification.schema";
import {ChatMessage} from "../../schemas/ChatMessage.schema";

@Injectable()
export class TeamService extends BaseService<Team> {




    constructor(

        @InjectModel(Team.name) private TeamModel: Model<Team>,
        @InjectModel(ChatMessage.name) private readonly chatMessageModel: Model<ChatMessage>,
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Notification.name) private notificationModel: Model<Notification>,
        @InjectModel(Project.name) private ProjectModel: Model<Project>,
        @InjectModel(Task.name) private readonly taskModel: Model<Task>,
        private readonly notificationService: NotificationService,

    ) {
        super(TeamModel);
    }
    async createTeam(createTaskDto: CreateTeamDto) {
        return super.create(createTaskDto)
    }

    getAllTeams() {
        return super.findAll();

     }

     getOneTeam(id: string) {
         return super.findOne(id);
     }
 
     updateTeam(id: string, updateTeamDto: UpdateTeamDto) {
         return super.update(id,updateTeamDto);
     }

  async deleteTeam(id: string) {
    try {
      // Find the team to delete
      const team = await this.TeamModel.findById(id);
      if (!team) {
        throw new NotFoundException('Team not found');
      }

      // Find all users belonging to the team
      const users = await this.UserModel.find({ 'teams': id });
      if (users.length > 0) {
        // Remove the team reference from each user
        await Promise.all(users.map(async (user) => {
          user.teams = user.teams.filter(teamId => teamId.toString() !== id);
          await user.save();
        }));
      }

      // Delete the team
      await super.remove(id);

      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addMemberToTeam(teamId: string, userId: string): Promise<Team | null> {
    try {
      const team = await this.TeamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException('Team not found');
      }

      // Update the user document
      const user = await this.UserModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Ensure that team.users and user.teams are arrays
      team.users = team.users || [];
      user.teams = user.teams || [];

      // Update the user's teams and save
      user.teams.push(team);
      await user.save();

      // Update the team's users and save
      team.users.push(user);
      await team.save();

      return team;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  async affectteamtoproject(teamId: string, projectId: string) {
    try {
      const team = await this.TeamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException('Team not found');
      }


      // Check if the user already exists in the team
      if (team.project.map(project => project.toString()).includes(projectId)) {
        return team;
      }
      const project = await this.ProjectModel.findById(projectId).exec();
      if (!project) {
        throw new NotFoundException('project not found');
      } else {
        project.teams.push(team._id.toString());
      }
      team.project.push(project);
      await team.save(); // Save the updated team document
      await project.save(); // Save the updated team document

      return team;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async assignTaskToMember(taskId: string, userId: string): Promise<void> {
    const user = await this.UserModel.findById(userId); // Await the result
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const task = await this.taskModel.findByIdAndUpdate(taskId, { assignedTo: user }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await task.save();
  }
  async getUsersInProject(projectId: string): Promise<User[]> {
    const teams = await this.TeamModel.find({ project: projectId }).exec();

    console.log("Teams:", teams); // Log teams to check if all teams associated with the project are retrieved

    // Extract user IDs from all teams
    const userIds = teams.flatMap(team => team.users.map(user => user));

    console.log("User IDs:", userIds); // Log user IDs to ensure you're getting users from all teams

    // Step 2: Query users with the IDs obtained
    const users = await this.UserModel.find({ _id: { $in: userIds } }).exec();

    return users;
  }
  async removeUserFromTeam(teamId: string, userId: string) {
    try {
      // Find the team
      const team = await this.TeamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException('Team not found');
      }

      // Find the user
      const user = await this.UserModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Remove the team from all teams the user belongs to
      user.teams = user.teams.filter(userTeamId => userTeamId.toString() !== teamId);

      // Remove the user from all teams they are a member of
      team.users = team.users.filter(teamUserId => teamUserId.toString() !== userId);

      // Save the updated user and team documents
      await user.save();
      await team.save();

      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsersNotInTeam(teamId: string, roleName: string): Promise<User[]> {
    try {
      // Find the team by ID
      const team = await this.TeamModel.findById(teamId).exec();
      if (!team) {
        throw new Error('Team not found');
      }

      // Find notifications for the team
      const notifications = await this.notificationModel.find({ pending: teamId }).exec();
      const userIds = notifications.map(notification => notification.user);

      // Find users who are not in the team and have the specified role
      const users = await this.UserModel.find({
        teams: { $ne: teamId },
        _id: { $nin: userIds } // Exclude users with pending notifications for the specified team
      }).populate('role').exec();

      // Filter users based on the specified role and number of teams
      return users.filter(user =>
           user.role.role === roleName && (!user.teams || user.teams.length < 3)
       );
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }




  async addMemberToTeam2(teamId: string, userId: string) {
    try {
      const team = await this.TeamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException('Team not found');
      }

      // Update the user document
      const user = await this.UserModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Ensure that team.users and user.teams are arrays
      team.users = team.users || [];
      user.teams = user.teams || [];

      // Send a notification to the user
      await this.notificationService.sendTeamInvitationNotification(team, userId); // Pass the team and user ID

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async displayNotifications(userId: string): Promise<Notification[]> {
    try {
      // Find the user by ID and populate the 'notifications' field
      const user = await this.UserModel.findById(userId).populate('notifications').exec();
       if (!user) {
        throw new NotFoundException('User not found');
      }

      return user.notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error(`Error fetching notifications: ${error.message}`);
    }
  }
  async acceptTeamInvitation(userId: string, notificationId: string): Promise<void> {
    try {
      // Find the user by ID
      const user = await this.UserModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Find the notification by ID
      const notification = await this.notificationModel.findById(notificationId);
      if (!notification) {
        throw new NotFoundException('Notification not found');
      }

      // Get the team ID from the pending field of the notification
      const teamId = notification.pending.toString();

      // Check if the user is already a member of three teams
      if (user.teams.length >= 3) {
        await this.notificationModel.deleteOne({ _id: notificationId });

        throw new Error('User is already a member of three teams');
      }

      // Remove the notification from the user's pending notifications
      user.notifications = user.notifications.filter(notif => notif.toString() !== notificationId);
      await user.save();

      // Add the user to the team
      const team = await this.addMemberToTeam(teamId, userId);

      // Remove the notification from the database
      await this.notificationModel.deleteOne({ _id: notificationId });
    } catch (error) {
      throw new Error(`Error accepting team invitation: ${error.message}`);
    }
  }
  async rejectTeamInvitation(notificationId: string): Promise<void> {
    try {
      // Find the user by ID
      // Find the notification by ID
      const notification = await this.notificationModel.findById(notificationId);
      if (!notification) {
        throw new NotFoundException('Notification not found');
      }

      // Remove the notification from the database
      await this.notificationModel.deleteOne({ _id: notificationId });
    } catch (error) {
      throw new Error(`Error accepting team invitation: ${error.message}`);
    }
  }

  async sendChatMessage(teamId: string, senderId: User, content: string): Promise<void> {
    try {
      // Find the team by ID
      const team = await this.TeamModel.findById(teamId);
      if (!team) {
        throw new Error('Team not found');
      }

      // Create a new chat message
      const newMessage = new this.chatMessageModel({ sender: senderId, content:content });

      // Add the new message to the team's chat
      team.chat.push(newMessage) ;
     await newMessage.save();
      // Save the updated team document
      await team.save();
    } catch (error) {
      throw new Error(`Error sending chat message: ${error.message}`);
    }


  }
  async getChatMessages(teamId: string): Promise<ChatMessage[]> {
    try {
      // Find the team by ID and populate the chat messages
      const team = await this.TeamModel.findById(teamId).populate('chat').exec();
      if (!team) {
        throw new Error('Team not found');
      }

      // Extract the chat messages from the team object
      const chatMessages = team.chat;

      return chatMessages;
    } catch (error) {
      throw new Error(`Error fetching chat messages: ${error.message}`);
    }
  }

  async getTeamsForUser(userId: string): Promise<Team[]> {
    try {
      // Find the user by ID and populate the 'teams' field
      const user = await this.UserModel.findById(userId).populate('teams').exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Extract teams from the user object
      const teams = user.teams;

      return teams;
    } catch (error) {
      throw new Error(`Error fetching teams for user: ${error.message}`);
    }
  }



}
