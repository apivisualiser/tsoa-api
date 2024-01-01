import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "./user";

export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

let userList: User[] = [
  {
    id: 1,
    email: "jane@doe.com",
    name: "Jane Doe",
    status: "Happy",
    phoneNumbers: [],
  },
];

@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<User> {
    return userList.find((x) => x.id == userId)!;
  }

  @Delete("{userId}")
  public async deleteUser(@Path() userId: number): Promise<User> {
    const deletedUser = userList.find((x) => x.id == userId)!;
    userList = userList.filter((x) => x.id != userId);
    return deletedUser;
  }

  @Get()
  public async getList(): Promise<User[]> {
    return userList;
  }

  @Get("find")
  public async findUser(@Query() name?: string): Promise<User> {
    return userList.find((x) => x.name == name)!;
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
    @Query() generateRandomId?: boolean
  ): Promise<User> {
    this.setStatus(201); // set return status 201
    const newUser: User = {
      ...requestBody,
      id: generateRandomId
        ? Math.floor(Math.random() * 10000)
        : userList.length + 1,
    };

    userList.push(newUser);
    return newUser;
  }
}
