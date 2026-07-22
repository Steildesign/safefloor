import { CommunityAlert, Resource, Substance } from '@/domain/types';
import { Locale } from '@/i18n/provider';

export interface CommunityRepository {
  getAlerts(): Promise<CommunityAlert[]>;
  getAlert(id: string): Promise<CommunityAlert | undefined>;
}

export interface KnowledgeRepository {
  getSubstances(): Promise<Substance[]>;
  getSubstance(slug: string): Promise<Substance | undefined>;
}

export interface ResourceRepository {
  getResources(): Promise<Resource[]>;
}

export interface TripSitterService {
  reply(message: string, locale?: Locale): Promise<{ message: string; action: 'NONE' | 'START_BREATHING' | 'SHOW_EMERGENCY' }>;
}
