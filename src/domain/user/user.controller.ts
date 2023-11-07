import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto, ResponseUserDto, UpdateUserDto} from './dto';
import { AuthService, LocalServiceAuthGuard } from '../../auth';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse, ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../infra/entities';
import { LoginUserDto } from './dto/request/login-user.dto';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { ApiResponse, HttpExceptionFilter, ResponseCode } from '../../common';
import {CustomApiOKResponse} from "../../common/api/response-ok.decorator";
import {CustomApiCreatedResponse} from "../../common/api/response-created.decorator";

@ApiTags('유저 API')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ summary: '유저 생성', description: '유저를 생성한다.' })
  @CustomApiCreatedResponse(
    Number,
    '유저를 생성하면 유저의 고유 ID를 integer로 반환한다.',
  )
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    await this.userService.findUserByEmail(createUserDto.email);

    createUserDto.password = await this.userService.hashPassword(
      createUserDto.password,
    );
    return this.userService.saveUser(createUserDto).then((result) => {
      res
        .status(HttpStatus.CREATED)
        .json(ApiResponse.success(ResponseCode.USER_CREATED_SUCCESS, result));
    });
  }

  //유저 로그인
  @Post('/login')
  @ApiOperation({ summary: '유저 로그인', description: '유저를 로그인한다.' })
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalServiceAuthGuard)
  @CustomApiOKResponse(1, '로그인을 하면 JWT TOKEN 문자열을 반환한다.')
  async login(@Req() req, @Body() loginUserDto: LoginUserDto) {
    const token = this.authService.loginServiceUser(req.user);
    return ApiResponse.success(ResponseCode.USER_LOGIN_SUCCESS, token);
  }

  @Put('/update')
  @ApiOperation({
    summary: '유저 정보 수정',
    description: '유저 정보를 수정한다.',
  })
  //@UseGuards(JwtServiceAuthGuard)
  @ApiCreatedResponse({
    description: '유저 정보를 수정하면 statusCode 200을 반환한다.',
    type: ApiResponse<null>,
  })
  async update(@Res() res, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(updateUserDto).then((result) => {
      res
        .status(HttpStatus.OK)
        .json(ApiResponse.success(ResponseCode.USER_UPDATE_SUCCESS, result));
    });
  }
  @Get(':id')
  @ApiOperation({
    summary: '유저 정보 조회',
    description: '유저 정보를 조회한다.',
  })
  @CustomApiOKResponse(
    ResponseUserDto,
    '유저 정보를 조회하면 유저 정보를 반환한다.',
  )
  //@ApiBearerAuth('access-token')
  //@UseGuards(JwtServiceAuthGuard)
  async findOne(@Res() res, @Param('id') id: number) {
    return await this.userService.findUserById(id).then((result) => {
      res
        .status(HttpStatus.OK)
        .json(ApiResponse.success(ResponseCode.USER_READ_SUCCESS, result));
    });
  }
}
