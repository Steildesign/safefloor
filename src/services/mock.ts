import { alerts, resources, substances } from '@/data/mock';
import { CommunityRepository, KnowledgeRepository, ResourceRepository, TripSitterService } from './contracts';

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const mockCommunityRepository: CommunityRepository = {
  async getAlerts() {
    await wait(180);
    return alerts;
  },
  async getAlert(id) {
    await wait(120);
    return alerts.find((alert) => alert.id === id);
  },
};

export const mockKnowledgeRepository: KnowledgeRepository = {
  async getSubstances() {
    await wait(120);
    return substances;
  },
  async getSubstance(slug) {
    await wait(120);
    return substances.find((substance) => substance.slug === slug);
  },
};

export const mockResourceRepository: ResourceRepository = {
  async getResources() {
    await wait(120);
    return resources;
  },
};

export const mockTripSitterService: TripSitterService = {
  async reply(message, locale = 'de') {
    await wait(650);
    const normalized = message.toLowerCase();
    if (normalized.includes('atmet nicht') || normalized.includes('bewusstlos') || normalized.includes('brustschmerz') || normalized.includes('not breathing') || normalized.includes('unconscious') || normalized.includes('chest pain')) {
      return { message: locale === 'de' ? 'Bitte rufe jetzt sofort 112 und hole eine anwesende Person oder das Personal dazu.' : 'Please call 112 now and get someone nearby or a member of staff to help.', action: 'SHOW_EMERGENCY' };
    }
    if (normalized.includes('atmen') || normalized.includes('unruhig')) {
      return { message: locale === 'de' ? 'Ich bin bei dir. Wenn es sich gut anfühlt, können wir gemeinsam langsam atmen.' : 'I am here with you. If it feels okay, we can breathe slowly together.', action: 'START_BREATHING' };
    }
    return { message: locale === 'de' ? 'Danke, dass du mir das sagst. Bist du gerade an einem Ort, an dem du sitzen oder dich anlehnen kannst?' : 'Thank you for telling me. Are you somewhere you can sit down or lean against something?', action: 'NONE' };
  },
};
