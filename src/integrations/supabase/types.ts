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
          description: string | null
          due_date: string | null
          expected_amount: number | null
          extra_cost_type_id: string | null
          iban_user: string | null
          id: string
          matched_at: string | null
          participation_request_id: string | null
          payment_type: string
          reference_code: string | null
          status: string | null
          user_id: string
          validated_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          expected_amount?: number | null
          extra_cost_type_id?: string | null
          iban_user?: string | null
          id?: string
          matched_at?: string | null
          participation_request_id?: string | null
          payment_type?: string
          reference_code?: string | null
          status?: string | null
          user_id: string
          validated_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          expected_amount?: number | null
          extra_cost_type_id?: string | null
          iban_user?: string | null
          id?: string
          matched_at?: string | null
          participation_request_id?: string | null
          payment_type?: string
          reference_code?: string | null
          status?: string | null
          user_id?: string
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_reconciliation_extra_cost_type_id_fkey"
            columns: ["extra_cost_type_id"]
            isOneToOne: false
            referencedRelation: "extra_cost_types"
            referencedColumns: ["id"]
          },
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
      calendar_blocks: {
        Row: {
          block_type: string | null
          car_id: string | null
          created_at: string | null
          created_by: string | null
          end_date: string
          id: string
          reason: string
          start_date: string
        }
        Insert: {
          block_type?: string | null
          car_id?: string | null
          created_at?: string | null
          created_by?: string | null
          end_date: string
          id?: string
          reason: string
          start_date: string
        }
        Update: {
          block_type?: string | null
          car_id?: string | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string
          id?: string
          reason?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_blocks_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_blocks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      car_admin_notes: {
        Row: {
          car_id: string
          notes: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          car_id: string
          notes?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          car_id?: string
          notes?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "car_admin_notes_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: true
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      cars: {
        Row: {
          annual_fee_override: number | null
          annual_fee_percent: number | null
          available_in: string[] | null
          brand: string
          category: string | null
          consultation_enabled: boolean | null
          created_at: string
          deadline: string | null
          description: string | null
          features: string[] | null
          gallery: string[] | null
          id: string
          image_url: string | null
          is_active: boolean | null
          km_per_participation: number | null
          location_id: string
          luxury_description: string | null
          luxury_description_override: string | null
          manager_email: string | null
          manager_name: string | null
          manager_phone: string | null
          max_participations: number | null
          max_reservation_days: number | null
          min_reservation_days: number | null
          model: string
          name: string
          participation_duration_years: number | null
          participation_price: number | null
          price: number
          promotion: Json | null
          remaining_participations: number | null
          reservation_advance_days: number | null
          slug: string | null
          specifications: Json | null
          status: string | null
          technical_sheet: Json | null
          total_km: number | null
          updated_at: string
          weeks_per_participation: number | null
          year: number
        }
        Insert: {
          annual_fee_override?: number | null
          annual_fee_percent?: number | null
          available_in?: string[] | null
          brand: string
          category?: string | null
          consultation_enabled?: boolean | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          features?: string[] | null
          gallery?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          km_per_participation?: number | null
          location_id: string
          luxury_description?: string | null
          luxury_description_override?: string | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          max_participations?: number | null
          max_reservation_days?: number | null
          min_reservation_days?: number | null
          model: string
          name: string
          participation_duration_years?: number | null
          participation_price?: number | null
          price: number
          promotion?: Json | null
          remaining_participations?: number | null
          reservation_advance_days?: number | null
          slug?: string | null
          specifications?: Json | null
          status?: string | null
          technical_sheet?: Json | null
          total_km?: number | null
          updated_at?: string
          weeks_per_participation?: number | null
          year: number
        }
        Update: {
          annual_fee_override?: number | null
          annual_fee_percent?: number | null
          available_in?: string[] | null
          brand?: string
          category?: string | null
          consultation_enabled?: boolean | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          features?: string[] | null
          gallery?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          km_per_participation?: number | null
          location_id?: string
          luxury_description?: string | null
          luxury_description_override?: string | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          max_participations?: number | null
          max_reservation_days?: number | null
          min_reservation_days?: number | null
          model?: string
          name?: string
          participation_duration_years?: number | null
          participation_price?: number | null
          price?: number
          promotion?: Json | null
          remaining_participations?: number | null
          reservation_advance_days?: number | null
          slug?: string | null
          specifications?: Json | null
          status?: string | null
          technical_sheet?: Json | null
          total_km?: number | null
          updated_at?: string
          weeks_per_participation?: number | null
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
      consultation_requests: {
        Row: {
          admin_notes: string | null
          car_id: string | null
          car_name: string | null
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string | null
          name: string
          phone: string | null
          responded_at: string | null
          source: string | null
          status: string
          subject: string | null
        }
        Insert: {
          admin_notes?: string | null
          car_id?: string | null
          car_name?: string | null
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          name: string
          phone?: string | null
          responded_at?: string | null
          source?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          admin_notes?: string | null
          car_id?: string | null
          car_name?: string | null
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          name?: string
          phone?: string | null
          responded_at?: string | null
          source?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultation_requests_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_logs: {
        Row: {
          admin_id: string
          content: string
          created_at: string
          follow_up_date: string | null
          id: string
          request_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          admin_id: string
          content: string
          created_at?: string
          follow_up_date?: string | null
          id?: string
          request_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          admin_id?: string
          content?: string
          created_at?: string
          follow_up_date?: string | null
          id?: string
          request_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
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
      cookie_consents: {
        Row: {
          analytics: boolean
          consent_version: string
          consented_at: string
          id: string
          marketing: boolean
          personalization: boolean
          session_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          analytics?: boolean
          consent_version?: string
          consented_at?: string
          id?: string
          marketing?: boolean
          personalization?: boolean
          session_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          analytics?: boolean
          consent_version?: string
          consented_at?: string
          id?: string
          marketing?: boolean
          personalization?: boolean
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      credit_reminder_rules: {
        Row: {
          created_at: string | null
          days_before_reset: number
          id: string
          is_active: boolean
          label: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          days_before_reset?: number
          id?: string
          is_active?: boolean
          label?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          days_before_reset?: number
          id?: string
          is_active?: boolean
          label?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
          is_premium_period: boolean
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
          is_premium_period?: boolean
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
          is_premium_period?: boolean
          is_recurring?: boolean | null
          months?: number[] | null
          multiplier?: number
          name?: string
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      document_types: {
        Row: {
          applies_to: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_required: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          applies_to?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_required?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          applies_to?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_required?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      extra_cost_categories: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          label: string
          sort_order: number
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          label: string
          sort_order?: number
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          label?: string
          sort_order?: number
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      extra_cost_types: {
        Row: {
          category: string
          created_at: string
          default_amount: number | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          default_amount?: number | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          default_amount?: number | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
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
      internal_notes: {
        Row: {
          admin_id: string
          content: string
          created_at: string
          highlighted_text: string | null
          id: string
          request_id: string
        }
        Insert: {
          admin_id: string
          content: string
          created_at?: string
          highlighted_text?: string | null
          id?: string
          request_id: string
        }
        Update: {
          admin_id?: string
          content?: string
          created_at?: string
          highlighted_text?: string | null
          id?: string
          request_id?: string
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
          slug: string | null
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
          slug?: string | null
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
          slug?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      participant_documents: {
        Row: {
          created_at: string
          document_type_id: string
          file_name: string | null
          file_size: number | null
          file_url: string
          id: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
          uploaded_by: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type_id: string
          file_name?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          uploaded_by?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type_id?: string
          file_name?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          uploaded_by?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_documents_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
        ]
      }
      participation_requests: {
        Row: {
          car_id: string
          created_at: string
          id: string
          list_priority: number | null
          num_participations: number | null
          num_participations_modified: boolean | null
          payment_amount: number | null
          payment_proof_url: string | null
          payment_status: string | null
          questionnaire_answers: Json | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          reopened_at: string | null
          reopened_by: string | null
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
          list_priority?: number | null
          num_participations?: number | null
          num_participations_modified?: boolean | null
          payment_amount?: number | null
          payment_proof_url?: string | null
          payment_status?: string | null
          questionnaire_answers?: Json | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          reopened_at?: string | null
          reopened_by?: string | null
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
          list_priority?: number | null
          num_participations?: number | null
          num_participations_modified?: boolean | null
          payment_amount?: number | null
          payment_proof_url?: string | null
          payment_status?: string | null
          questionnaire_answers?: Json | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          reopened_at?: string | null
          reopened_by?: string | null
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
          role: string
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
          role?: string
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
          role?: string
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
      questionnaire_config: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          options: Json | null
          order_index: number
          question_key: string
          question_text: string
          question_type: string
          section: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          options?: Json | null
          order_index?: number
          question_key: string
          question_text: string
          question_type?: string
          section?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          options?: Json | null
          order_index?: number
          question_key?: string
          question_text?: string
          question_type?: string
          section?: number
          updated_at?: string
        }
        Relationships: []
      }
      request_tags: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          request_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          request_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          request_id?: string
          tag_id?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          cancelled_at: string | null
          cancelled_by: string | null
          car_id: string
          created_at: string
          credit_multiplier: number | null
          credits_used: number
          end_date: string
          id: string
          is_peak_period: boolean | null
          notes: string | null
          participation_id: string
          premium_credits_used: number
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          reservation_type: string
          standard_credits_used: number
          start_date: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancelled_at?: string | null
          cancelled_by?: string | null
          car_id: string
          created_at?: string
          credit_multiplier?: number | null
          credits_used?: number
          end_date: string
          id?: string
          is_peak_period?: boolean | null
          notes?: string | null
          participation_id: string
          premium_credits_used?: number
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          reservation_type?: string
          standard_credits_used?: number
          start_date: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancelled_at?: string | null
          cancelled_by?: string | null
          car_id?: string
          created_at?: string
          credit_multiplier?: number | null
          credits_used?: number
          end_date?: string
          id?: string
          is_peak_period?: boolean | null
          notes?: string | null
          participation_id?: string
          premium_credits_used?: number
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          reservation_type?: string
          standard_credits_used?: number
          start_date?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
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
            foreignKeyName: "reservations_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      scoring_config: {
        Row: {
          answer_value: string
          created_at: string
          excludent_type: string | null
          id: string
          is_excludent: boolean
          points: number
          question_key: string
          risk_flag: string
          updated_at: string
        }
        Insert: {
          answer_value: string
          created_at?: string
          excludent_type?: string | null
          id?: string
          is_excludent?: boolean
          points?: number
          question_key: string
          risk_flag?: string
          updated_at?: string
        }
        Update: {
          answer_value?: string
          created_at?: string
          excludent_type?: string | null
          id?: string
          is_excludent?: boolean
          points?: number
          question_key?: string
          risk_flag?: string
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string
          created_at: string
          created_by: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
        }
        Relationships: []
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
          premium_credits_per_year: number
          premium_credits_remaining: number
          premium_credits_used_this_year: number
          request_id: string
          standard_credits_per_year: number
          standard_credits_remaining: number
          standard_credits_used_this_year: number
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
          premium_credits_per_year?: number
          premium_credits_remaining?: number
          premium_credits_used_this_year?: number
          request_id: string
          standard_credits_per_year?: number
          standard_credits_remaining?: number
          standard_credits_used_this_year?: number
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
          premium_credits_per_year?: number
          premium_credits_remaining?: number
          premium_credits_used_this_year?: number
          request_id?: string
          standard_credits_per_year?: number
          standard_credits_remaining?: number
          standard_credits_used_this_year?: number
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
      vehicle_document_types: {
        Row: {
          created_at: string | null
          description: string | null
          has_expiry_date: boolean | null
          id: string
          is_active: boolean | null
          is_public: boolean | null
          is_required: boolean | null
          name: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          has_expiry_date?: boolean | null
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          is_required?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          has_expiry_date?: boolean | null
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          is_required?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vehicle_documents: {
        Row: {
          car_id: string | null
          created_at: string | null
          document_type_id: string | null
          expiry_date: string | null
          file_name: string | null
          file_size: number | null
          file_url: string
          id: string
          notes: string | null
          updated_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          car_id?: string | null
          created_at?: string | null
          document_type_id?: string | null
          expiry_date?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          notes?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          car_id?: string | null
          created_at?: string | null
          document_type_id?: string | null
          expiry_date?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          notes?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_documents_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_documents_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "vehicle_document_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
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
      vehicle_maintenance: {
        Row: {
          car_id: string | null
          cost: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          documents: string[] | null
          id: string
          maintenance_type: string
          mileage_at_service: number | null
          notes: string | null
          provider: string | null
          service_date: string
          updated_at: string | null
        }
        Insert: {
          car_id?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          documents?: string[] | null
          id?: string
          maintenance_type: string
          mileage_at_service?: number | null
          notes?: string | null
          provider?: string | null
          service_date: string
          updated_at?: string | null
        }
        Update: {
          car_id?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          documents?: string[] | null
          id?: string
          maintenance_type?: string
          mileage_at_service?: number | null
          notes?: string | null
          provider?: string | null
          service_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_maintenance_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_maintenance_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      classify_reservation_type: {
        Args: { p_car_id: string; p_end_date: string; p_start_date: string }
        Returns: string
      }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
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
      is_city_manager: { Args: { _user_id?: string }; Returns: boolean }
      is_superadmin: { Args: { _user_id?: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "superadmin" | "city_manager" | "user"
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
      app_role: ["superadmin", "city_manager", "user"],
      contact_status: ["new", "contacted", "closed"],
      participation_status: ["pending", "approved", "rejected"],
    },
  },
} as const
