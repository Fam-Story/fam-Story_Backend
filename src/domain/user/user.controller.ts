import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { LoginUserDto } from './dto/request/login-user.dto';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { ApiResponse, ResponseCode } from '../../common';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';
import { ResponseLoginDto } from '../../auth/dto/response-login.dto';

@ApiTags('회원 API')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '[회원가입] 회원 가입',
    description: '회원 가입을 처리하고 회원 정보를 저장한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '이메일로 중복검사를 실시한 후, 회원가입이 완료되면 회원의 고유 ID를 Integer로 반환한다.',
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
  @ApiOperation({
    summary: '[로그인] 로그인 후 JWT 토큰 발급',
    description:
      '이메일과 비밀번호를 확인한 후, 로그인이 성공하면 JWT 토큰을 문자열 형태로 반환한다.',
  })
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
    summary: '[프로필] 회원 정보 수정',
    description: '회원 정보를 직접 수정한다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtServiceAuthGuard)
  @ApiCreatedResponse({
    description: '회원 정보를 수정하면 statusCode 200을 반환한다.',
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
    summary: '[프로필] 회원 탈퇴',
    description: '회원 탈퇴 후, 회원 객체를 삭제한다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtServiceAuthGuard)
  @ApiOkResponse({
    description: '회원 삭제에 성공하면 statuscode 200을 반환한다.',
    type: ApiResponse<null>,
  })
  async delete(@Res() res, @Query('userId') id: number) {
    return await this.userService.deleteUser(id).then((result) => {
      res
        .status(HttpStatus.OK)
        .json(ApiResponse.success(ResponseCode.USER_DELETE_SUCCESS, result));
    });
  }

  @Get('')
  @ApiOperation({
    summary: '[프로필] 회원 정보 조회',
    description:
      '회원 정보를 조회하며, 자신 외에 다른 회원의 정보를 조회할 수 없다.',
  })
  @CustomApiOKResponse(
    ResponseUserDto,
    '회원 정보를 조회하면 유저 정보를 반환한다.',
  )
  @ApiBearerAuth('access-token')
  @UseGuards(JwtServiceAuthGuard)
  async findOne(@Req() req, @Res() res, @Query('userId') id: number) {
    if (req.user.id != id) {
      //passport는 기본적으로 req.user에 저장함
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(ApiResponse.fail(ResponseCode.USER_FORBIDDEN, null));
    }
    return await this.userService.findUserById(id).then((result) => {
      res
        .status(HttpStatus.OK)
        .json(ApiResponse.success(ResponseCode.USER_READ_SUCCESS, result));
    });
  }
}
