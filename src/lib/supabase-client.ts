import { createClient } from '@supabase/supabase-js'

import { supabaseAnonKey, supabaseUrl } from 'src/config/supabase'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
