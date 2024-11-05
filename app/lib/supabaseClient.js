// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Get the Supabase URL and Anon Key from Expo constants
const supabaseUrl = Constants.expoConfig.extra.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig.extra.supabaseAnonKey;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
