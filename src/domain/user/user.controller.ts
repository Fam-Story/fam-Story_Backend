import {
  Body,
  Controller, Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto';
import { AuthService, LocalServiceAuthGuard } from '../../auth';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../infra/entities';
import { LoginUserDto } from './dto/request/login-user.dto';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { ApiResponse, HttpExceptionFilter, ResponseCode } from '../../common';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';
import { ResponseLoginDto } from '../../auth/dto/response-login.dto';

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
    await this.userService.findUserByEmail(createUserDto.email); //이메일로 중복 여부 검사

    createUserDto.password = await this.userService.hashPassword(
      createUserDto.password, //비밀번호 암호화
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
  @CustomApiOKResponse(
    ResponseLoginDto,
    '로그인을 하면 JWT TOKEN 문자열을 반환한다.',
  )
  async login(@Req() req, @Body() loginUserDto: LoginUserDto) {
    const responseLoginDto = this.authService.loginServiceUser(req.user);
    return ApiResponse.success(
      ResponseCode.USER_LOGIN_SUCCESS,
      responseLoginDto,
    );
  }

  @Put('')
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

  @Delete('')
  @ApiOperation({
    summary: '유저 삭제',
    description: '유저를 삭제한다.',
  })
  //@UseGuards(JwtServiceAuthGuard)
  @ApiOkResponse({
    description: '유저를 삭제하면 statusCode 200을 반환한다.',
    type: ApiResponse<null>,
  })
  async delete(@Res() res, @Query('id') id: number) {
    return await this.userService.deleteUser(id).then((result) => {
      res
        .status(HttpStatus.OK)
        .json(ApiResponse.success(ResponseCode.USER_DELETE_SUCCESS, result));
    });
  }

  @Get('')
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
  async findOne(@Res() res, @Query('id') id: number) {
    return await this.userService.findUserById(id).then((result) => {
      res
        .status(HttpStatus.OK)
        .json(ApiResponse.success(ResponseCode.USER_READ_SUCCESS, result));
    });
  }
}
