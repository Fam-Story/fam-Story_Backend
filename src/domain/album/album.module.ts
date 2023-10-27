import {Module} from "@nestjs/common";
import {FamilyController} from "../family/family.controller";
import {FamilyService} from "../family/family.service";

@Module({
    controllers: [
        FamilyController,

    ],
    providers: [
        FamilyService,

    ],
})
export class FamilyModule {}