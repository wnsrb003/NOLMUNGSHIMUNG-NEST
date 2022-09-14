import { Module } from '@nestjs/common';
import { VoicetalkService } from './voicetalk.service';

@Module({
  providers: [VoicetalkService],
  exports: [VoicetalkService]
})
export class VoicetalkModule {}
