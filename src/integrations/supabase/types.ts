export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          details: Json | null
          id: string
          target_id: string | null
          target_table: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_table?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_table?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_reconciliation: {
        Row: {
          created_at: string
          expected_amount: number | null
          iban_user: string | null
          id: string
          matched_at: string | null
          participation_request_id: string
          reference_code: string | null
          status: string | null
          user_id: string
          validated_by: string | null
        }
        Insert: {
          created_at?: string
          expected_amount?: number | null
          iban_user?: string | null
          id?: string
          matched_at?: string | null
          participation_request_id: string
          reference_code?: string | null
          status?: string | null
          user_id: string
          validated_by?: string | null
        }
        Update: {
          created_at?: string
          expected_amount?: number | null
          iban_user?: string | null
          id?: string
          matched_at?: string | null
          participation_request_id?: string
          reference_code?: string | null
          status?: string | null
          user_id?: string
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_reconciliation_participation_request_id_fkey"
            columns: ["participation_request_id"]
            isOneToOne: false
            referencedRelation: "participation_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_reconciliation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_reconciliation_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cars: {
        Row: {
          available_in: string[] | null
          brand: string
          category: string | null
          created_at: string
          deadline: string | null
          description: string | null
          features: string[] | null
          gallery: string[] | null
          id: string
          image_url: string | null
          is_active: boolean | null
          location_id: string | null
          luxury_description: string | null
          max_participations: number | null
          model: string
          name: string
          participation_price: number | null
          price: number
          remaining_participations: number | null
          specifications: Json | null
          status: string | null
          technical_sheet: Json | null
          total_km: number | null
          updated_at: string
          year: number
        }
        Insert: {
          available_in?: string[] | null
          brand: string
          category?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          features?: string[] | null
          gallery?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location_id?: string | null
          luxury_description?: string | null
          max_participations?: number | null
          model: string
          name: string
          participation_price?: number | null
          price: number
          remaining_participations?: number | null
          specifications?: Json | null
          status?: string | null
          technical_sheet?: Json | null
          total_km?: number | null
          updated_at?: string
          year: number
        }
        Update: {
          available_in?: string[] | null
          brand?: string
          category?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          features?: string[] | null
          gallery?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location_id?: string | null
          luxury_description?: string | null
          max_participations?: number | null
          model?: string
          name?: string
          participation_price?: number | null
          price?: number
          remaining_participations?: number | null
          specifications?: Json | null
          status?: string | null
          technical_sheet?: Json | null
          total_km?: number | null
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "cars_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          source: string | null
          status: Database["public"]["Enums"]["contact_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          updated_at?: string
        }
        Relationships: []
      }
      content_sections: {
        Row: {
          body: string | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          page: string
          section_key: string
          sort_order: number
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          page: string
          section_key: string
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          page?: string
          section_key?: string
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          car_id: string
          created_at: string
          file_url: string | null
          id: string
          participation_id: string | null
          requires_signature: boolean | null
          signature_status: string | null
          signed_at: string | null
          type: string
          uploaded_by: string | null
          user_id: string
        }
        Insert: {
          car_id: string
          created_at?: string
          file_url?: string | null
          id?: string
          participation_id?: string | null
          requires_signature?: boolean | null
          signature_status?: string | null
          signed_at?: string | null
          type: string
          uploaded_by?: string | null
          user_id: string
        }
        Update: {
          car_id?: string
          created_at?: string
          file_url?: string | null
          id?: string
          participation_id?: string | null
          requires_signature?: boolean | null
          signature_status?: string | null
          signed_at?: string | null
          type?: string
          uploaded_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_participation_id_fkey"
            columns: ["participation_id"]
            isOneToOne: false
            referencedRelation: "validated_participations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_rules: {
        Row: {
          applies_to_all: boolean | null
          car_ids: string[] | null
          created_at: string | null
          credits_per_day: number
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          is_recurring: boolean | null
          months: number[] | null
          multiplier: number
          name: string
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          applies_to_all?: boolean | null
          car_ids?: string[] | null
          created_at?: string | null
          credits_per_day?: number
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          months?: number[] | null
          multiplier?: number
          name: string
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          applies_to_all?: boolean | null
          car_ids?: string[] | null
          created_at?: string | null
          credits_per_day?: number
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          months?: number[] | null
          multiplier?: number
          name?: string
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      featured_cars: {
        Row: {
          car_id: string
          created_at: string
          id: string
          is_active: boolean
          sort_order: number
        }
        Insert: {
          car_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          sort_order?: number
        }
        Update: {
          car_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "featured_cars_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_slides: {
        Row: {
          created_at: string
          cta_link: string | null
          cta_text: string | null
          id: string
          image_url: string
          is_active: boolean
          sort_order: number
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url: string
          is_active?: boolean
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      kyc_documents: {
        Row: {
          created_at: string
          file_url: string | null
          id: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_url?: string | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kyc_documents_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kyc_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      participation_requests: {
        Row: {
          car_id: string
          created_at: string
          id: string
          num_participations: number | null
          payment_amount: number | null
          payment_proof_url: string | null
          payment_status: string | null
          questionnaire_answers: Json | null
          score: number | null
          score_notes: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          car_id: string
          created_at?: string
          id?: string
          num_participations?: number | null
          payment_amount?: number | null
          payment_proof_url?: string | null
          payment_status?: string | null
          questionnaire_answers?: Json | null
          score?: number | null
          score_notes?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          car_id?: string
          created_at?: string
          id?: string
          num_participations?: number | null
          payment_amount?: number | null
          payment_proof_url?: string | null
          payment_status?: string | null
          questionnaire_answers?: Json | null
          score?: number | null
          score_notes?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participation_requests_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participation_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participations: {
        Row: {
          car_id: string
          created_at: string
          id: string
          notes: string | null
          num_participations: number
          status: Database["public"]["Enums"]["participation_status"]
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          car_id: string
          created_at?: string
          id?: string
          notes?: string | null
          num_participations?: number
          status?: Database["public"]["Enums"]["participation_status"]
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          car_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          num_participations?: number
          status?: Database["public"]["Enums"]["participation_status"]
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participations_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city_id: string | null
          created_at: string
          email: string | null
          iban: string | null
          id: string
          kyc_status: string | null
          linkedin: string | null
          name: string | null
          phone: string | null
          surname: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city_id?: string | null
          created_at?: string
          email?: string | null
          iban?: string | null
          id: string
          kyc_status?: string | null
          linkedin?: string | null
          name?: string | null
          phone?: string | null
          surname?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city_id?: string | null
          created_at?: string
          email?: string | null
          iban?: string | null
          id?: string
          kyc_status?: string | null
          linkedin?: string | null
          name?: string | null
          phone?: string | null
          surname?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          car_id: string
          created_at: string
          credit_multiplier: number | null
          credits_used: number
          end_date: string
          id: string
          is_peak_period: boolean | null
          notes: string | null
          participation_id: string
          start_date: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          car_id: string
          created_at?: string
          credit_multiplier?: number | null
          credits_used?: number
          end_date: string
          id?: string
          is_peak_period?: boolean | null
          notes?: string | null
          participation_id: string
          start_date: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          car_id?: string
          created_at?: string
          credit_multiplier?: number | null
          credits_used?: number
          end_date?: string
          id?: string
          is_peak_period?: boolean | null
          notes?: string | null
          participation_id?: string
          start_date?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_participation_id_fkey"
            columns: ["participation_id"]
            isOneToOne: false
            referencedRelation: "validated_participations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      validated_participations: {
        Row: {
          car_id: string
          created_at: string
          credits_per_year: number | null
          credits_remaining: number | null
          credits_reset_date: string | null
          credits_used_this_year: number | null
          id: string
          participation_number: number
          request_id: string
          user_id: string
        }
        Insert: {
          car_id: string
          created_at?: string
          credits_per_year?: number | null
          credits_remaining?: number | null
          credits_reset_date?: string | null
          credits_used_this_year?: number | null
          id?: string
          participation_number: number
          request_id: string
          user_id: string
        }
        Update: {
          car_id?: string
          created_at?: string
          credits_per_year?: number | null
          credits_remaining?: number | null
          credits_reset_date?: string | null
          credits_used_this_year?: number | null
          id?: string
          participation_number?: number
          request_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "validated_participations_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validated_participations_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "participation_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validated_participations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_inspections: {
        Row: {
          car_id: string
          condition_after: string | null
          condition_before: string | null
          created_at: string
          id: string
          inspector_id: string | null
          km_after: number | null
          km_before: number | null
          notes: string | null
          photos_after: string[] | null
          photos_before: string[] | null
          reservation_id: string | null
        }
        Insert: {
          car_id: string
          condition_after?: string | null
          condition_before?: string | null
          created_at?: string
          id?: string
          inspector_id?: string | null
          km_after?: number | null
          km_before?: number | null
          notes?: string | null
          photos_after?: string[] | null
          photos_before?: string[] | null
          reservation_id?: string | null
        }
        Update: {
          car_id?: string
          condition_after?: string | null
          condition_before?: string | null
          created_at?: string
          id?: string
          inspector_id?: string | null
          km_after?: number | null
          km_before?: number | null
          notes?: string | null
          photos_after?: string[] | null
          photos_before?: string[] | null
          reservation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_inspections_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_inspections_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_inspections_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          brand: string | null
          car_model: string
          comment: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          brand?: string | null
          car_model: string
          comment?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          brand?: string | null
          car_model?: string
          comment?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_city_id: { Args: { _user_id?: string }; Returns: string }
      insert_audit_log: {
        Args: {
          _action: string
          _details?: Json
          _target_id?: string
          _target_table?: string
        }
        Returns: string
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_city_manager: { Args: { _user_id?: string }; Returns: boolean }
      is_superadmin: { Args: { _user_id?: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "superadmin" | "city_manager" | "user"
      contact_status: "new" | "contacted" | "closed"
      participation_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "superadmin", "city_manager", "user"],
      contact_status: ["new", "contacted", "closed"],
      participation_status: ["pending", "approved", "rejected"],
    },
  },
} as const
