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
  async reply(message) {
    await wait(650);
    const normalized = message.toLowerCase();
    if (normalized.includes('atmet nicht') || normalized.includes('bewusstlos') || normalized.includes('brustschmerz')) {
      return { message: 'Bitte rufe jetzt sofort 112 und hole eine anwesende Person oder das Personal dazu.', action: 'SHOW_EMERGENCY' };
    }
    if (normalized.includes('atmen') || normalized.includes('unruhig')) {
      return { message: 'Ich bin bei dir. Wenn es sich gut anfühlt, können wir gemeinsam langsam atmen.', action: 'START_BREATHING' };
    }
    return { message: 'Danke, dass du mir das sagst. Bist du gerade an einem Ort, an dem du sitzen oder dich anlehnen kannst?', action: 'NONE' };
  },
};
