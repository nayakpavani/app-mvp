export const PortalContainer = {
  container_id: "portal",
  states: {
    splash_portal: {
      tone: { theme: "gold_dark", mood: "steady" },
      blocks: [{ type: "lotus_logo" }],
      actions: { primary: null, secondary: null },
    },

    portal: {
      tone: { theme: "gold_dark", mood: "steady" },
      blocks: [
        { type: "lotus_logo" },
        { type: "headline", content: "KalpX Companion" },
        { type: "subtext", content: "Step into structure. Begin your scan." },
        {
          type: "chip_list",
          key: "entry_intent",
          options: [
            { id: "seek_growth", label: "Growth" },
            { id: "seek_clarity", label: "Clarity" },
            { id: "seek_pressure", label: "Pressure" },
            { id: "seek_purpose", label: "Purpose" },
            { id: "seek_peace", label: "Peace" },
            { id: "seek_strength", label: "Strength" },
          ],
        },
        {
          type: "primary_button",
          label: "Initiate Prana Scan →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              state_id: "discipline_select",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "start_cycle", secondary: null },
    },

    void_state: {
      tone: { theme: "gold_dark", mood: "neutral" },
      blocks: [
        { type: "headline", content: "You have no active cycle." },
        { type: "subtext", content: "Without structure, identity drifts." },
        {
          type: "primary_button",
          label: "Begin New Cycle →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              state_id: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "begin_new", secondary: null },
    },

    post_completion: {
      tone: { theme: "gold_dark", mood: "reflective" },
      blocks: [
        { type: "headline", content: "Cycle Complete." },
        { type: "subtext", content: "Integration begins with reflection." },
        {
          type: "primary_button",
          label: "Begin Again →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              state_id: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "restart_cycle", secondary: "view_insights" },
    },

    re_entry_portal: {
      tone: { theme: "gold_dark", mood: "steady" },
      blocks: [
        { type: "headline", content: "Return to Structure." },
        { type: "subtext", content: "Your previous rhythm awaits." },
        {
          type: "primary_button",
          label: "Resume Cycle →",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress", // FIXED
              state_id: "resume_restart_recalibrate",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "resume_cycle", secondary: "restart_cycle" },
    },

    reset_portal: {
      tone: { theme: "gold_dark", mood: "grounded" },
      blocks: [
        { type: "headline", content: "Structure has softened." },
        { type: "subtext", content: "Begin again with intention." },
        {
          type: "primary_button",
          label: "Restart Cycle →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              state_id: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "reset_cycle", secondary: null },
    },
  },
};

export const ChoiceStackContainer = {
  container_id: "choice_stack",

  states: {
    // 1️⃣ MODE TOGGLE
    mode_toggle: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Choose your cycle length.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Short focus or sustained shift.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "single_auto_advance",
          options: [
            {
              id: "7_day",
              title: "7-Day Cycle",
              description: "Focused correction. Rapid reset.",
            },
            {
              id: "14_day",
              title: "14-Day Cycle",
              description: "Deeper conditioning. Structural shift.",
            },
          ],
        },
      ],
      on_select: {
        default: {
          type: "navigate",
          target: {
            container_id: "choice_stack",
            state_id: "discipline_select",
          },
        },
      },
    },

    // 2️⃣ DISCIPLINE SELECT (this replaces scan_focus)
    discipline_select: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "What feels most important right now ?",
          position: "header",
        },
        {
          type: "subtext",
          content: "Choose one plan to focus for 14 days",
          position: "header",
        },
        {
          type: "choice_card",
          id: "scan_focus",
          selection_mode: "manual",
          options: [
            {
              id: "careerprosperity",
              title: "Career & Prosperity",
              description: "For leadership, success, and wealth.",
            },
            {
              id: "peacecalm",
              title: "Peace & Calm",
              description: "For clarity and silencing the noise.",
            },
            {
              id: "emotionalhealing",
              title: "Emotional Healing",
              description: "For release and heart connection.",
            },
            {
              id: "focusmotivation",
              title: "Focus & Motivation",
              description: "For mental drive and sharp clarity.",
            },
            {
              id: "gratitudepositivity",
              title: "Gratitude & Positivity",
              description: "For joy and attracting abundance.",
            },
            {
              id: "healthwellbeing",
              title: "Health & Wellbeing",
              description: "For physical vigor and balance.",
            },
            {
              id: "spiritualgrowth",
              title: "Spiritual Growth",
              description: "For deep connection and wisdom.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Continue →",
          action: {
            type: "navigate",
            target: {
              container_id: "stable_scan",
              state_id: "prana_baseline",
            },
          },
          style: "gold",
          position: "footer",
        },
      ],
    },

    // 3️⃣ DOMAIN SELECT
    domain_select: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Choose your life domain.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Where does this discipline apply?",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "manual",
          options: [
            {
              id: "wealth",
              title: "Wealth",
              description: "Financial awareness & discipline.",
            },
            {
              id: "relationships",
              title: "Relationships",
              description: "Conscious communication.",
            },
            {
              id: "health",
              title: "Health",
              description: "Energy & physical integrity.",
            },
            {
              id: "work",
              title: "Work",
              description: "Professional steadiness.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Continue →",
          action: {
            type: "navigate",
            target: {
              container_id: "composer",
              state_id: "sankalp_composer",
            },
          },
          style: "gold",
          position: "footer",
        },
      ],
    },

    // 4️⃣ DEEPEN SELECTION (reused later)
    deepen_select: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Select deeper layer.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "manual",
          options: [
            {
              id: "increase_reps",
              title: "Increase mantra reps",
              description: "Deepen repetition.",
            },
            {
              id: "increase_anchor",
              title: "Increase anchor duration",
              description: "Extend stabilization.",
            },
            {
              id: "add_refinement",
              title: "Add refinement layer",
              description: "Increase awareness discipline.",
            },
          ],
        },
      ],
    },
    // 5️⃣ DEPTH SELECTION
    depth_selection: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        {
          type: "headline",
          content: "Choose your depth.",
          position: "header",
        },
        {
          type: "subtext",
          content:
            "You will repeat the same core practice daily. Repetition builds transformation.",
          position: "header",
        },
        {
          type: "choice_card",
          id: "routine_depth",
          selection_mode: "manual",
          options: [
            {
              id: "gentle",
              title: "Gentle",
              description: "A seed of awareness. 3 minutes daily.",
            },
            {
              id: "standard",
              title: "Standard",
              description: "The steady flame. 7 minutes daily.",
            },
            {
              id: "deep",
              title: "Deep",
              description: "The warrior's path. 14 minutes daily.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "PROCEED TO LOCK → →",
          action: {
            type: "navigate",
            target: {
              container_id: "lock_ritual_overlay",
              state_id: "hold_to_lock",
            },
          },
          style: "gold",
          position: "footer",
        },
      ],
    },
  },
};

export const ComposerContainer = {
  container_id: "composer",

  states: {
    // 1️⃣ MAIN COMPOSER (Fresh Write)
    sankalp_composer: {
      tone: { theme: "light_sandal", mood: "steady" },

      meta: {
        min_length: 12,
        max_length: 120,
        allow_ai_assist: true,
      },

      blocks: [
        {
          type: "headline",
          content: "Write your Sankalp.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Short. Clear. Behavioral.",
          position: "header",
        },
        {
          type: "textarea",
          id: "sankalp_input",
          character_limit: 120,
        },
        {
          type: "chip_list",
          options: [
            { id: "raise_voice", label: "I respond without raising my voice." },
            { id: "complete_begin", label: "I complete what I begin." },
            { id: "before_react", label: "I pause before reacting." },
            { id: "act_financial", label: "I act with financial awareness." },
          ],
        },
        // {
        //   type: "helper_text",
        //   content: "A Sankalp is behavioral. Not aspirational.",
        // },
        {
          type: "subtext",
          content: "Need suggestions?",
          variant: "link",
          action: {
            type: "navigate",
            target: {
              container_id: "composer",
              state_id: "ai_suggestions",
            },
          },
          position: "footer",
        },

        {
          type: "primary_button",
          label: "Continue ",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              state_id: "mantra_reps_picker",
            },
          },
          validation: {
            min_length: 12,
          },
          style: "gold",
          position: "footer",
        },
      ],
    },

    // 2️⃣ AI SUGGESTIONS OVERLAY
    ai_suggestions: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Suggested Sankalps",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            {
              id: "s1",
              title: "I pause before responding in tension.",
            },
            {
              id: "s2",
              title: "I complete tasks before switching.",
            },
            {
              id: "s3",
              title: "I speak honestly without aggression.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Proceed",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              state_id: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
    },

    // 3️⃣ VALIDATION WARNING (Too Vague / Too Short)
    validation_warning: {
      tone: { theme: "light_sandal", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Refine your Sankalp.",
        },
        {
          type: "subtext",
          content: "Make it behavioral and specific.",
        },
        {
          type: "primary_button",
          label: "Edit",
          action: {
            type: "navigate",
            target: {
              container_id: "composer",
              state_id: "sankalp_composer",
            },
          },
        },
      ],
    },

    // 4️⃣ EDIT EXISTING SANKALP (Before Lock)
    edit_sankalp: {
      tone: { theme: "light_sandal", mood: "steady" },

      meta: {
        preload_existing: true,
      },

      blocks: [
        {
          type: "headline",
          content: "Refine your Sankalp.",
        },
        {
          type: "text_input",
          id: "sankalp_input",
          preload_existing: true,
          character_limit: 120,
        },
        {
          type: "primary_button",
          label: "Update",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_locked",
              state_id: "locked_summary",
            },
          },
        },
      ],
    },

    // 5️⃣ LOCKED REDIRECT (If Cycle Already Active)
    locked_redirect: {
      tone: { theme: "light_sandal", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Your Sankalp is already active.",
        },
        {
          type: "subtext",
          content: "Adjust structure intentionally if needed.",
        },
        {
          type: "primary_button",
          label: "View Structure",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_locked",
              state_id: "locked_summary",
            },
          },
        },
      ],
    },
  },
};

export const LockRitualContainer = {
  container_id: "lock_ritual_overlay",

  states: {
    // 1️⃣ CYCLE LOCK FRICTION STATE
    hold_to_lock: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "steady" },

      meta: {
        hold_duration_ms: {
          "7_day": 1800,
          "14_day": 2400,
        },
        block_background_interaction: true,
        cancel_on_release: true,
      },

      blocks: [
        {
          type: "micro_label",
          content: "FINALIZE STRUCTURE",
          style: "uppercase_subtle",
        },
        {
          type: "headline",
          content: "Hold to lock your cycle.",
        },
        {
          type: "subtext",
          content: "Commit to this structure for the selected duration.",
        },
        {
          type: "hold_button",
          label: "Hold",
          interaction: {
            type: "press_and_hold",
            progress_ring: true,
            glow_intensity: "gradual_gold",
            haptic_feedback: {
              mid_point: true,
              completion: true,
            },
          },
          on_complete: {
            type: "generate_companion",
          },
        },
        {
          type: "helper_text",
          content: "Structure builds identity.",
        },
      ],
    },
  },
};

export const RoutineBuilderContainer = {
  container_id: "routine_builder",

  states: {
    // 1️⃣ MANTRA FREQUENCY PICKER
    mantra_reps_picker: {
      tone: { theme: "light_sandal", mood: "structured" },

      blocks: [
        {
          type: "headline",
          content: "Mantra Repetitions",
        },
        {
          type: "subtext",
          content: "Select your daily repetition count.",
        },
        {
          type: "option_picker",
          id: "mantra_reps",
          options: [9, 18, 27, 54],
          selection_mode: "single",
        },
        {
          type: "primary_button",
          label: "Next →",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              state_id: "anchor_duration_picker",
            },
          },
        },
      ],
    },

    // 2️⃣ ANCHOR DURATION SLIDER
    anchor_duration_picker: {
      tone: { theme: "light_sandal", mood: "structured" },

      blocks: [
        {
          type: "headline",
          content: "Anchor Duration",
        },
        {
          type: "subtext",
          content: "Select your daily stabilization time.",
        },
        {
          type: "option_picker",
          id: "anchor_duration",
          options: [3, 5, 8, 12],
          selection_mode: "single",
          unit: "minutes",
        },
        {
          type: "primary_button",
          label: "Next →",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              state_id: "refinement_layer_menu",
            },
          },
        },
      ],
    },

    // 3️⃣ REFINEMENT LAYER MENU
    refinement_layer_menu: {
      tone: { theme: "light_sandal", mood: "structured" },

      blocks: [
        {
          type: "headline",
          content: "Choose refinement layer",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "observation", title: "Observation" },
            { id: "embodiment", title: "Embodiment" },
            { id: "stability", title: "Stability" },
          ],
        },
        {
          type: "primary_button",
          label: "Review Routine →",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              state_id: "routine_review_summary",
            },
          },
        },
      ],
    },

    // 4️⃣ AI SUGGESTION MODAL
    ai_suggestion_modal: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Suggested Adjustments",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            {
              id: "reduce_anchor",
              title: "Reduce anchor to maintain consistency",
            },
            {
              id: "increase_reps",
              title: "Increase reps for deeper repetition",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Apply Suggestion",
          action: { type: "apply_adjustment" },
        },
      ],
    },

    // 5️⃣ OVER-STACKING WARNING
    over_stacking_warning: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "caution" },

      blocks: [
        {
          type: "headline",
          content: "Structure may be too intense.",
        },
        {
          type: "subtext",
          content: "Too much change reduces consistency.",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "simplify", title: "Simplify Structure" },
            { id: "proceed_anyway", title: "Proceed Anyway" },
          ],
        },
      ],
    },

    // 6️⃣ ROUTINE REVIEW SUMMARY
    routine_review_summary: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Routine Summary",
        },
        {
          type: "summary_block",
          fields: [
            { label: "Mantra", value_key: "mantra_reps" },
            { label: "Anchor", value_key: "anchor_duration" },
            { label: "Refinement", value_key: "refinement_layer" },
            { label: "Sankalp", value_key: "sankalp_text" },
          ],
        },
        {
          type: "primary_button",
          label: "Lock Structure →",
          action: {
            type: "navigate",
            target: {
              container_id: "lock_ritual_overlay",
              state_id: "hold_to_lock",
            },
          },
          style: "gold",
        },
      ],
    },
  },
};

export const RoutineLockedContainer = {
  container_id: "routine_locked",

  states: {
    // 1️⃣ ROUTINE LOCKED STATE (READ-ONLY)
    locked_summary: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Your cycle is locked.",
        },
        {
          type: "subtext",
          content: "Consistency creates identity.",
        },
        {
          type: "summary_block",
          fields: [
            { label: "Sankalp", value_key: "sankalp_text" },
            { label: "Mantra Repetitions", value_key: "mantra_reps" },
            { label: "Anchor Duration", value_key: "anchor_duration" },
            { label: "Refinement Layer", value_key: "refinement_layer" },
          ],
        },
        {
          type: "link_text",
          content: "Adjust with intention",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_locked",
              state_id: "adjust_with_intention",
            },
          },
        },
      ],
    },

    // 2️⃣ ADJUST WITH INTENTION PORTAL
    adjust_with_intention: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "caution" },

      meta: {
        requires_confirmation: true,
      },

      blocks: [
        {
          type: "headline",
          content: "Adjusting will reset structural consistency.",
        },
        {
          type: "subtext",
          content: "This action should be intentional.",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            {
              id: "continue_adjust",
              title: "Continue to Adjust",
            },
            {
              id: "cancel_adjust",
              title: "Cancel",
            },
          ],
        },
      ],

      on_select: {
        continue_adjust: {
          type: "navigate",
          target: {
            container_id: "routine_builder",
            state_id: "mantra_reps_picker",
          },
        },
        cancel_adjust: {
          type: "navigate",
          target: {
            container_id: "routine_locked",
            state_id: "locked_summary",
          },
        },
      },
    },

    // 3️⃣ CONFIRMATION OF ADJUSTED STRUCTURE
    adjusted_confirmation: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Structure updated intentionally.",
        },
        {
          type: "subtext",
          content: "Continue your cycle with clarity.",
        },
        {
          type: "primary_button",
          label: "Return to Dashboard",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
  },
};

export const CompanionDashboardContainer = {
  container_id: "companion_dashboard",

  states: {
    // 1️⃣ COMMAND DASHBOARD (Day X of 14)
    day_active: {
      tone: { theme: "light_sandal", mood: "steady" },

      meta: {
        requires_active_cycle: true,
        reactive_updates: true,
      },

      blocks: [
        {
          type: "headline",
          content: "Day {{day_number}} of 14 — {{focus_name}}",
          position: "header",
          style: {
            textAlign: "right",
            color: "#8c6d1f",
            letterSpacing: "2px",
          },
        },
        {
          type: "subtext",
          content: "Same roots daily. Growth comes from repetition.",
          position: "header",
        },

        // Practice Access Cards
        {
          type: "practice_card",
          id: "practice_chant",
          title: "Chant",
          description: "{{mantra_text}}",
          meta: "{{practice_chant_meta}}",
          icon: "fas fa-om",
          action_label: "Start →",
          style: {
            background: "rgba(201, 168, 76, 0.05)",
            boxShadow: "0 10px 30px rgba(201, 168, 76, 0.1)",
            borderRadius: "24px",
            border: "1px solid rgba(201, 168, 76, 0.3)",
          },
          info_action: {
            type: "view_info",
            payload: { type: "mantra" },
          },
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              state_id: "mantra_rep_selection",
            },
          },
        },
        {
          type: "practice_card",
          id: "practice_embody",
          title: "Embody",
          description: "{{sankalp_text}}",
          icon: "fas fa-fire",
          action_label: "I Embody This →",
          info_action: {
            type: "view_info",
            payload: { type: "sankalp" },
          },
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              state_id: "sankalp_embody",
            },
          },
        },
        {
          type: "practice_card",
          id: "practice_act",
          title: "Act",
          description: "{{practice_title}}",
          meta: "{{practice_meta}}",
          icon: "fas fa-mountain",
          action_label: "Mark Focus Complete →",
          info_action: {
            type: "view_info",
            payload: { type: "practice" },
          },
          action: {
            type: "submit",
            payload: { practiceId: "practice_act", completed: true },
          },
        },

        // Bottom Actions
        {
          type: "primary_button",
          label: "I Feel Triggered",
          style: "gold",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "breath_reset",
            },
          },
          position: "footer_actions",
        },
        {
          type: "primary_button",
          label: "Quick Check-In",
          style: "outline",
          action: {
            type: "navigate",
            target: {
              container_id: "cycle_transitions",
              state_id: "quick_checkin",
            },
          },
          position: "footer_actions",
        },

        {
          type: "subtext",
          content: "Reflect before resting →",
          variant: "link",
          action: {
            type: "navigate",
            target: {
              container_id: "cycle_transitions",
              state_id: "daily_reflection",
            },
          },
          position: "footer",
        },
      ],
    },

    // 2️⃣ IDENTITY STATE INDICATOR
    identity_state_view: {
      tone: { theme: "dark_base", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "You are {{identity_state}}.",
        },
        {
          type: "subtext",
          content: "{{identity_guidance}}",
        },
        {
          type: "identity_indicator",
          state: "{{identity_state}}",
        },
      ],
    },

    // 3️⃣ LIVE ADAPTATION NOTIFICATION
    adaptation_toast: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "neutral" },

      meta: {
        auto_dismiss_ms: 4000,
        non_blocking: true,
      },

      blocks: [
        {
          type: "toast_message",
          content: "{{adaptation_message}}",
        },
      ],
    },
  },
};

export const PracticeRunnerContainer = {
  container_id: "practice_runner",

  states: {
    // 0️⃣ MANTRA REP SELECTION
    mantra_rep_selection: {
      tone: { theme: "deep_focus", mood: "reflective" },
      blocks: [
        {
          type: "headline",
          content: "Spiritual Intensity",
        },
        {
          type: "subtext",
          content: "Select the number of repetitions for this session.",
        },
        {
          id: "reps_total",
          type: "option_picker",
          options: [9, 18, 27, 54, 108],
          unit: "Reps",
        },
        {
          id: "begin_mantra_practice",
          type: "primary_button",
          label: "Begin Practice →",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              state_id: "mantra_runner",
            },
          },
        },
      ],
    },
    // 1️⃣ MANTRA PRACTICE SCREEN (21)
    mantra_runner: {
      tone: { theme: "deep_focus", mood: "immersive" },

      meta: {
        disable_navigation: true,
        persist_progress: true,
      },

      blocks: [
        {
          type: "mantra_display",
          text_key: "mantra_text",
        },
        {
          type: "rep_counter",
          total: "{{reps_total}}",
        },
      ],

      on_complete: {
        type: "navigate",
        target: {
          container_id: "practice_runner",
          state_id: "mantra_complete",
        },
      },
    },

    // 2️⃣ MANTRA REP COUNTER FEEDBACK (22)
    mantra_feedback: {
      tone: { theme: "deep_focus", mood: "active" },

      blocks: [
        {
          type: "rep_counter_feedback",
          animation: "subtle_scale",
          haptic: true,
        },
      ],
    },

    // 3️⃣ MANTRA COMPLETION STATE (23)
    mantra_complete: {
      tone: { theme: "deep_focus", mood: "grounded" },

      blocks: [
        {
          type: "headline",
          content: "Mantra complete.",
        },
        {
          type: "subtext",
          content: "Stability reinforced.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "submit",
            payload: { practiceId: "practice_chant", completed: true },
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },

    // 4️⃣ SANKALP EMBODIMENT SCREEN (24)
    sankalp_embody: {
      tone: { theme: "deep_focus", mood: "reflective" },

      blocks: [
        {
          type: "sankalp_display",
          text_key: "sankalp_text",
        },
        {
          type: "instruction_text",
          content: "Read slowly. Internalize. Commit.",
        },
        {
          type: "primary_button",
          label: "Activate",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              state_id: "sankalp_confirm",
            },
          },
        },
      ],
    },

    // 5️⃣ SANKALP ACTIVATION CONFIRMATION (25)
    sankalp_confirm: {
      tone: { theme: "deep_focus", mood: "grounded" },

      blocks: [
        {
          type: "headline",
          content: "Embodiment set.",
        },
        {
          type: "subtext",
          content: "Live this today.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "submit",
            payload: { practiceId: "practice_embody", completed: true },
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },

    // 6️⃣ ANCHOR TIMER SCREEN (26)
    anchor_timer: {
      tone: { theme: "deep_focus", mood: "immersive" },

      meta: {
        persist_timer_background: true,
      },

      blocks: [
        {
          type: "timer_display",
          duration_key: "anchor_duration",
          format: "mm:ss",
        },
        {
          type: "timer_controls",
          options: ["start", "pause", "resume"],
        },
      ],

      on_complete: {
        type: "navigate",
        target: {
          container_id: "practice_runner",
          state_id: "anchor_complete",
        },
      },
    },

    // 7️⃣ ANCHOR COMPLETION STATE (27)
    anchor_complete: {
      tone: { theme: "deep_focus", mood: "grounded" },

      blocks: [
        {
          type: "headline",
          content: "Anchor complete.",
        },
        {
          type: "subtext",
          content: "Nervous system stabilized.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "submit",
            payload: { practiceId: "practice_act", completed: true },
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
  },
};

export const EmbodimentChallengeRunnerContainer = {
  container_id: "embodiment_challenge_runner",

  states: {
    // 1️⃣ DAILY EMBODIMENT CHALLENGE CARD (28)
    challenge_view: {
      tone: { theme: "dark_base", mood: "grounded" },

      meta: {
        requires_active_cycle: true,
        single_daily_instance: true,
      },

      blocks: [
        {
          type: "micro_label",
          content: "DHARMA IN ACTION",
        },
        {
          type: "headline",
          content: "Today's Embodiment",
        },
        {
          type: "challenge_text",
          text_key: "challenge_text",
        },
        {
          type: "subtext",
          content: "Did this occur today?",
        },
        {
          type: "choice_card",
          id: "embodiment_outcome",
          selection_mode: "single",
          options: [
            { id: "completed", title: "Completed" },
            { id: "avoided", title: "Avoided" },
            { id: "not_tested", title: "Not Tested" },
          ],
        },
      ],

      on_select: {
        completed: {
          type: "navigate",
          target: {
            container_id: "embodiment_challenge_runner",
            state_id: "challenge_confirm",
          },
        },
        avoided: {
          type: "navigate",
          target: {
            container_id: "embodiment_challenge_runner",
            state_id: "challenge_confirm",
          },
        },
        not_tested: {
          type: "navigate",
          target: {
            container_id: "embodiment_challenge_runner",
            state_id: "challenge_confirm",
          },
        },
      },
    },

    // 2️⃣ EMBODIMENT OUTCOME CONFIRMATION (29)
    challenge_confirm: {
      tone: { theme: "dark_base", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Outcome recorded.",
        },
        {
          type: "subtext",
          content: "Behavior logged for today.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
  },
};

export const AwarenessTriggerContainer = {
  container_id: "awareness_trigger",

  states: {
    // 1️⃣ MID-DAY AWARENESS PROMPT
    midday_prompt: {
      tone: { theme: "dark_base", mood: "reflective" },

      blocks: [
        {
          type: "headline",
          content: "Pause and check in.",
        },
        {
          type: "subtext",
          content: "What are you experiencing right now?",
        },
        {
          type: "primary_button",
          label: "Check In",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "response_matrix",
            },
          },
        },
      ],
    },

    // 2️⃣ AWARENESS RESPONSE MATRIX
    response_matrix: {
      tone: { theme: "dark_base", mood: "neutral" },

      blocks: [
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "irritation", title: "Irritation" },
            { id: "anxiety", title: "Anxiety" },
            { id: "urgency", title: "Urgency" },
            { id: "fatigue", title: "Fatigue" },
            { id: "avoidance", title: "Avoidance" },
          ],
        },
      ],

      on_select: {
        default: {
          type: "navigate",
          target: {
            container_id: "awareness_trigger",
            state_id: "breath_reset",
          },
        },
      },
    },

    // 3️⃣ PERSISTENT “I FEEL TRIGGERED” ENTRY
    trigger_entry: {
      tone: { theme: "dark_base", mood: "alert" },

      blocks: [
        {
          type: "headline",
          content: "You feel triggered.",
        },
        {
          type: "primary_button",
          label: "Begin Reset",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "breath_reset",
            },
          },
        },
      ],
    },

    // 4️⃣ 3-BREATH RESET ANIMATION
    breath_reset: {
      tone: { theme: "deep_focus", mood: "calming" },

      blocks: [
        {
          type: "breath_animation",
          cycles: 3,
        },
        {
          type: "sankalp_display",
          text_key: "sankalp_text",
        },
      ],

      on_complete: {
        type: "navigate",
        target: {
          container_id: "companion_dashboard",
          state_id: "day_active",
        },
      },
    },

    // 5️⃣ QUICK MANTRA LOOP SCREEN
    quick_mantra: {
      tone: { theme: "deep_focus", mood: "steady" },

      blocks: [
        {
          type: "mantra_display",
          text_key: "mantra_text",
        },
        {
          type: "rep_counter",
          total: 9,
        },
      ],

      on_complete: {
        type: "navigate",
        target: {
          container_id: "awareness_trigger",
          state_id: "trigger_reflection",
        },
      },
    },

    // 6️⃣ TRIGGER REFLECTION PROMPT
    trigger_reflection: {
      tone: { theme: "dark_base", mood: "reflective" },

      blocks: [
        {
          type: "headline",
          content: "What triggered this?",
        },
        {
          type: "text_input",
          id: "trigger_reflection_input",
          optional: true,
        },
        {
          type: "primary_button",
          label: "Continue",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "dharmic_response",
            },
          },
        },
      ],
    },

    // 7️⃣ DHARMIC RESPONSE SELECTION
    dharmic_response: {
      tone: { theme: "dark_base", mood: "grounded" },

      blocks: [
        {
          type: "headline",
          content: "How will you respond?",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options_key: "dharmic_response_options",
        },
      ],

      on_select: {
        default: {
          type: "navigate",
          target: {
            container_id: "awareness_trigger",
            state_id: "post_trigger_reinforcement",
          },
        },
      },
    },

    // 8️⃣ POST-TRIGGER REINFORCEMENT MESSAGE
    post_trigger_reinforcement: {
      tone: { theme: "dark_base", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Return steady.",
        },
        {
          type: "subtext",
          content: "You interrupted reaction.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },

    // 9️⃣ TRIGGER PATTERN INSIGHT GRAPH
    trigger_pattern_graph: {
      tone: { theme: "dark_base", mood: "analytical" },

      blocks: [
        {
          type: "graph",
          graph_type: "trigger_pattern",
          data_key: "trigger_pattern_data",
        },
      ],
    },

    // 🔟 EMOTIONAL DRIFT SOFT WARNING
    drift_warning: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "gentle" },

      blocks: [
        {
          type: "headline",
          content: "Emotional drift detected.",
        },
        {
          type: "subtext",
          content: "Return to your anchor.",
        },
      ],
    },

    // 1️⃣1️⃣ NERVOUS SYSTEM STABILIZATION PROMPT
    nervous_stabilization: {
      tone: { theme: "deep_focus", mood: "calming" },

      blocks: [
        {
          type: "headline",
          content: "Stabilize your nervous system.",
        },
        {
          type: "primary_button",
          label: "Begin 3-Minute Anchor",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              state_id: "anchor_timer",
            },
          },
        },
      ],
    },
  },
};

export const InsightsProgressContainer = {
  container_id: "insights_progress",

  states: {
    // -------- RESISTANCE & EGO --------

    resistance_detected: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Resistance detected." },
        { type: "subtext", content: "Avoidance patterns observed." },
        {
          type: "primary_button",
          label: "Reflect",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "resistance_reflection",
            },
          },
        },
      ],
    },

    resistance_reflection: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "What are you avoiding?" },
        { type: "text_input", id: "resistance_input" },
        { type: "primary_button", label: "Submit" },
      ],
    },

    ego_inflation_check: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Ego inflation detected." },
        { type: "subtext", content: "Overconfidence reduces awareness." },
      ],
    },

    // -------- ADAPTIVE STATES --------

    plateau_notice: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Plateau detected." },
        { type: "subtext", content: "Consistency without depth." },
      ],
    },

    stability_pivot: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [{ type: "headline", content: "Stability Mode Activated." }],
    },

    escalation_suggestion: {
      tone: { theme: "light_sandal", mood: "growth" },
      blocks: [
        { type: "headline", content: "Increase intensity?" },
        {
          type: "primary_button",
          label: "Deepen",
          action: {
            type: "navigate",
            target: { container_id: "choice_stack", state_id: "deepen_select" },
          },
        },
      ],
    },

    inactivity_recovery: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Cycle inactive." },
        { type: "subtext", content: "Resume or reset." },
      ],
    },

    resume_restart_recalibrate: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "resume", title: "Resume" },
            { id: "restart", title: "Restart" },
            { id: "recalibrate", title: "Recalibrate" },
          ],
        },
      ],
    },

    intentional_pause: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [{ type: "headline", content: "Pause cycle intentionally?" }],
    },

    gentle_exit: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [{ type: "headline", content: "Exit confirmed." }],
    },

    continue_confirmation: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [{ type: "headline", content: "Continue your path." }],
    },

    cross_cycle_integrity: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Integrity maintained across cycles." },
      ],
    },

    // -------- REFLECTION & HARVEST --------

    reflection_prompt_7day: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "7-Day Reflection" },
        { type: "text_input", id: "reflection_input" },
      ],
    },

    voice_reflection_prompt: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "Record your reflection." },
        { type: "voice_recorder" },
      ],
    },

    structured_written_reflection: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "Structured Reflection" },
        { type: "form_fields", fields_key: "reflection_questions" },
      ],
    },

    insight_summary: {
      tone: { theme: "light_sandal", mood: "analytical" },
      blocks: [
        { type: "headline", content: "Insight Summary" },
        { type: "summary_block", data_key: "insight_data" },
      ],
    },

    identity_delta_visualization: {
      tone: { theme: "light_sandal", mood: "analytical" },
      blocks: [{ type: "graph", graph_type: "identity_delta" }],
    },

    legacy_timeline: {
      tone: { theme: "light_sandal", mood: "analytical" },
      blocks: [{ type: "timeline", data_key: "cycle_history" }],
    },
  },
};

export const CycleTransitionsContainer = {
  container_id: "cycle_transitions",

  states: {
    // 1️⃣ DEEPEN SELECTION SCREEN
    deepen_selection: {
      tone: { theme: "light_sandal", mood: "growth" },

      blocks: [
        { type: "headline", content: "Deepen your practice?" },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "increase_reps", title: "Increase mantra reps" },
            { id: "increase_anchor", title: "Increase anchor duration" },
            { id: "add_refinement", title: "Add refinement layer" },
          ],
        },
      ],
    },

    // 2️⃣ DEEPEN CONFIRMATION
    deepen_confirmation: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        { type: "headline", content: "Practice intensified." },
        { 
          type: "subtext", 
          content: "You have deepened your rhythm. Your mantra repetitions are now set to {{reps_total}}." 
        },
        {
          type: "primary_button",
          label: "Return to Day →",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },

    // 3️⃣ EXTENSION ACTIVATION
    extension_activation: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        { type: "headline", content: "Extend this cycle?" },
        {
          type: "primary_button",
          label: "Extend 7 More Days",
          action: { type: "activate_extension" },
        },
      ],
    },

    // 4️⃣ SWITCH FOCUS WARNING
    switch_focus_warning: {
      tone: { theme: "light_sandal", mood: "caution" },

      blocks: [
        { type: "headline", content: "Switching focus resets momentum." },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "continue_switch", title: "Switch Focus" },
            { id: "stay", title: "Stay on Current Path" },
          ],
        },
      ],
    },

    // 5️⃣ NEW FOCUS CONFIRMATION
    new_focus_confirmation: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        { type: "headline", content: "New focus activated." },
        {
          type: "primary_button",
          label: "Begin New Cycle",
          action: {
            type: "navigate",
            target: { container_id: "choice_stack", state_id: "mode_toggle" },
          },
        },
      ],
    },

    // 6️⃣ CROSS-CYCLE INTEGRITY MESSAGE
    cross_cycle_integrity: {
      tone: { theme: "light_sandal", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Your previous cycle remains part of your identity.",
        },
      ],
    },

    // 7️⃣ CONTINUE SAME PATH
    continue_same_path: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Continue this path.",
        },
        {
          type: "primary_button",
          label: "Proceed",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },

    // 8️⃣ COMPANION ANALYSIS (REVEAL)
    companion_analysis: {
      overlay: true,
      tone: { theme: "gold_dark", mood: "steady" },
      tag: "AI COMPANION ANALYSIS",
      blocks: [
        { type: "lotus_logo", position: "header" },
        { type: "headline", content: "Your Path is Set.", position: "header" },
        {
          id: "analysis_intro",
          type: "subtext",
          content: "I have analyzed your request.",
          position: "content",
        },
        {
          id: "analysis_metrics",
          type: "subtext",
          content: "",
          variant: "small",
          position: "content",
        },
        {
          id: "analysis_insight",
          type: "subtext",
          content: "",
          position: "content",
        },
        {
          id: "card_ritual",
          type: "practice_card",
          title: "Selected Ritual",
          description: "Mindful Breathing",
          meta: "7 minutes daily",
          icon: "fas fa-leaf",
          position: "content",
        },
        {
          id: "card_sankalpa",
          type: "practice_card",
          title: "Sankalpa",
          description: "I am present.",
          icon: "fas fa-heart",
          meta: "Your spiritual intention.",
          position: "content",
        },
        {
          id: "card_mantra",
          type: "practice_card",
          title: "Mantra",
          description: "OM SHANTI",
          icon: "fas fa-om",
          meta: "The sound of transformation.",
          position: "content",
        },
        {
          type: "primary_button",
          label: "Seal & Enter Dashboard →",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
          style: "gold",
          position: "footer",
        },
        {
          type: "subtext",
          content: "Repetition is the mother of transformation.",
          position: "footer",
        },
      ],
    },

    // 9️⃣ HELP ME CHOOSE REVEAL
    help_me_choose_reveal: {
      overlay: true,
      tone: { theme: "light_sandal", mood: "steady" },
      tag: "AI ANALYSIS COMPLETE",
      blocks: [
        { type: "lotus_logo", position: "header" },
        { type: "headline", content: "Your Path Awaits.", position: "header" },
        {
          id: "help_me_choose_intro",
          type: "subtext",
          content: "",
          position: "content",
        },
        {
          id: "help_me_choose_analysis",
          type: "subtext",
          content: "",
          position: "content",
        },
        {
          id: "help_me_choose_button",
          type: "primary_button",
          label: "Begin Path →",
          action: {
            type: "fast_track_baseline",
            payload: { focus: "" }, // Will be filled dynamically by action executor or store
          },
          style: "gold",
          position: "footer",
        },
        {
          type: "subtext",
          content: "I will tailor your 14-day practices to this focus.",
          variant: "small",
          position: "footer",
        },
      ],
    },

    // 🔟 PATH EVOLUTION REVEAL
    path_evolution_reveal: {
      overlay: true,
      tone: { theme: "light_sandal", mood: "steady" },
      tag: "PATH EVOLUTION",
      blocks: [
        { type: "lotus_logo", position: "header" },
        {
          type: "headline",
          content: "The Journey Evolves.",
          position: "header",
        },
        {
          id: "path_evolution_text",
          type: "subtext",
          content: "",
          position: "content",
        },
        {
          type: "primary_button",
          label: "Continue to Baseline →",
          action: {
            type: "navigate",
            target: {
              container_id: "stable_scan",
              state_id: "prana_baseline",
            },
          },
          style: "gold",
          position: "footer",
        },
      ],
    },

    // 1️⃣1️⃣ INFO REVEAL (MODAL)
    info_reveal: {
      overlay: true,
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        {
          type: "headline",
          content: "{{info.title}}",
          position: "header",
        },
        {
          type: "subtext",
          content: "{{info.subtitle}}",
          variant: "italic",
          position: "header",
        },
        {
          type: "subtext",
          content: "{{info.description}}",
          variant: "italic_multiline",
          position: "content",
        },
        {
          type: "subtext",
          content: "{{info.steps_text}}",
          variant: "italic_multiline",
          position: "content",
        },
        {
          type: "subtext",
          content: "{{info.meta}}",
          variant: "small",
          position: "content",
        },
        {
          type: "primary_button",
          label: "Got it",
          action: { type: "back" },
          position: "footer",
        },
      ],
    },

    // 1️⃣2️⃣ QUICK CHECK-IN FLOW
    quick_checkin: {
      overlay: true,
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        { type: "headline", content: "How is your Prana right now?", position: "header" },
        { type: "subtext", content: "Just notice. No fixing required.", position: "header" },
        {
          type: "choice_grid",
          id: "current_prana",
          auto_advance: true,
          options: [
            { id: "energized", title: "Energized", icon: "fas fa-sun" },
            { id: "balanced", title: "Balanced", icon: "fas fa-balance-scale" },
            { id: "agitated", title: "Agitated", icon: "fas fa-cloud-showers-heavy" },
            { id: "drained", title: "Drained", icon: "fas fa-arrow-down" },
          ],
        },
      ],
      on_select: {
        default: {
          type: "navigate",
          target: { container_id: "cycle_transitions", state_id: "quick_checkin_ack" },
        },
      },
    },

    quick_checkin_ack: {
      overlay: true,
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        { type: "headline", content: "Acknowledged." },
        { type: "subtext", content: "Move forward with grace." },
        {
          type: "primary_button",
          label: "View Progress →",
          action: {
            type: "navigate",
            target: { container_id: "cycle_transitions", state_id: "daily_insight" },
          },
        },
      ],
    },

    daily_insight: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        { type: "micro_label", content: "DAY {{day_number}} INSIGHT — {{focus_name}}", position: "header" },
        { type: "headline", content: "Your growth is becoming visible.", position: "header" },
        { type: "subtext", content: "Awareness precedes transformation.", position: "header" },
        
        {
          type: "insight_box",
          variant: "highlight",
          items: [
            { 
              text: "You paused before reacting <strong>6 times</strong> this week.",
              subtext: "Earlier, those moments passed unnoticed."
            }
          ]
        },
        
        {
          type: "trend_chart",
          title: "Calm & Clarity Trend",
          footer: "Your mind steadiness increased steadily after Day 3."
        },
        
        {
          type: "insight_box",
          items: [
            { icon: "far fa-eye", text: "You felt most restless before work conversations" },
            { icon: "fas fa-seedling", text: "You returned to your Sankalp faster mid-week" },
            { icon: "fas fa-fire", text: "Your calm improved on days you completed Sadhana early" }
          ]
        },

        {
          type: "insight_box",
          items: [
            { 
              text: "<strong>{{sankalp_text}}</strong>",
              subtext: "You embodied this Sankalp on 4 of 7 days.\nEmbodiment grows through repetition."
            }
          ]
        },

        { type: "micro_label", content: "A gentle reminder", variant: "centered" },
        { 
          type: "subtext", 
          content: "Progress is not about never slipping.\nIt is about returning with awareness.",
          variant: "centered"
        },
        
        {
          type: "primary_button",
          label: "Continue for 7 more days",
          subtext: "Deepen steadiness.",
          style: "gold",
          action: {
            type: "navigate",
            target: { container_id: "cycle_transitions", state_id: "cycle_complete_overview" },
          },
        },
        
        {
          type: "primary_button",
          label: "Explore a new focus",
          subtext: "Shift consciously.",
          style: "outline",
          action: {
            type: "navigate",
            target: { container_id: "cycle_transitions", state_id: "re_analysis_input" },
          }
        },

        {
           type: "subtext",
           content: "You are training the mind — not chasing outcomes.",
           variant: "small_centered"
        }
      ],
    },

    daily_reflection: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        { type: "headline", content: "Reflect on Day {{day_number}}" },
        { type: "textarea", placeholder: "What did you learn today?" },
        {
          type: "primary_button",
          label: "Seal Day & Advance →",
          action: { type: "seal_day" },
          position: "footer"
        },
      ],
    },

    // 1️⃣3️⃣ CYCLE COMPLETION (Day 7/14)
    cycle_complete_overview: {
      tone: { theme: "light_sandal", mood: "growth" },
      blocks: [
        { type: "micro_label", content: "CYCLE COMPLETE", position: "header" },
        { type: "headline", content: "You have completed {{day_number}} days.", position: "header" },
        { type: "subtext", content: "Consistency builds character. Choice builds mastery.", position: "header" },
        
        {
          type: "insight_box",
          variant: "highlight",
          items: [{ text: "You began this cycle feeling anxious. Now your clarity is steadier." }]
        },
        
        {
          type: "headline",
          variant: "small",
          content: "How would you like to proceed?"
        },

        {
          type: "choice_card",
          selection_mode: "single_auto_advance",
          options: [
            { 
                id: "continue", 
                title: "Continue This Path", 
                description: "Strengthen your Sankalp. Go deeper into the same practice.",
                meta: "Depth creates transformation.",
                icon: "fas fa-fire"
            },
            { 
                id: "deepen", 
                title: "Deepen Your Practice", 
                description: "Add one advanced element to refine your discipline.",
                meta: "• Add Breath Regulation\n• Add Leadership Dharma Reflection\n• Add Advanced Karma Sadhana",
                icon: "fas fa-seedling"
            },
            { 
                id: "change", 
                title: "Change Focus Area", 
                description: "Shift your focus area consciously based on your progress.",
                meta: "Explore a new path →",
                icon: "fas fa-compass"
            }
          ]
        }
      ],
      on_select: {
        continue: {
          type: "submit",
          target: { container_id: "companion_dashboard", state_id: "day_active" }
        },
        deepen: {
          type: "navigate",
          target: { container_id: "cycle_transitions", state_id: "deepen_sadhana" }
        },
        change: {
          type: "navigate",
          target: { container_id: "cycle_transitions", state_id: "re_analysis_input" }
        }
      }
    },

    deepen_sadhana: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        { type: "micro_label", content: "DEEPEN YOUR SADHANA", position: "header" },
        { type: "headline", content: "Strengthen What You Have Begun", position: "header" },
        { 
          type: "subtext", 
          content: "You will keep your core mantra and sankalp.\nWe will refine your discipline.",
          position: "header"
        },
        {
          type: "insight_box",
          items: [
            { 
                text: "<strong>Your Core:</strong>",
                subtext: "• Mantra: {{mantra_text}}\n• Sankalp: {{sankalp_text}}\n• Anchor: Focused Practice" 
            }
          ]
        },
        {
          type: "headline",
          variant: "small",
          content: "Choose Your Refinement Layer"
        },
        {
          type: "choice_card",
          id: "refinement_layer",
          selection_mode: "single",
          options: [
            { 
                id: "rep_deepen", 
                title: "Deepen Through Repetition", 
                description: "Increase mantra reps and extend anchor duration.",
                meta: "27 → 54 reps | Anchor +5 mins",
                icon: "fas fa-link"
            },
            { 
                id: "observation", 
                title: "Add Inner Observation", 
                description: "Introduce a mid-day awareness pause and deeper reflection question.",
                meta: "Refinement sharpens awareness.",
                icon: "fas fa-eye"
            },
            { 
                id: "dharma_action", 
                title: "Activate Dharma in Action", 
                description: "Apply your Sankalp consciously in real-world situations.",
                meta: "Transformation must enter action.",
                icon: "fas fa-bolt"
            }
          ]
        },
        {
          type: "primary_button",
          label: "Begin Next 7 Days →",
          action: { type: "submit", target: { container_id: "cycle_transitions", state_id: "deepen_confirmation" } },
          style: "gold",
          position: "footer"
        },
        {
          type: "primary_button",
          label: "Return to Current Practice",
          action: { type: "back" },
          style: "outline",
          position: "footer"
        }
      ]
    },

    re_analysis_input: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "How are you feeling right now?", position: "header" },
        { type: "subtext", content: "Where did you get stuck in the last cycle?", position: "header" },
        {
          id: "re_analysis_friction",
          type: "textarea",
          placeholder: "Describe your current mental state and any obstacles...",
        },
        {
          type: "primary_button",
          label: "Next →",
          action: {
            type: "navigate",
            target: { container_id: "cycle_transitions", state_id: "re_analysis_category" },
          },
          position: "footer"
        }
      ]
    },

    re_analysis_category: {
      overlay: true,
      tone: { theme: "light_sandal", mood: "steady" },
      tag: "AI INTERVENTION",
      blocks: [
        { type: "headline", content: "Choose your path direction.", position: "header" },
        { type: "subtext", content: "Do you want to shift your focus area or deepen the current one?", position: "header" },
        {
          id: "re_analysis_direction",
          type: "choice_card",
          selection_mode: "single",
          options: [
            { 
               id: "stay", 
               title: "Stay with {{focus_name}}", 
               description: "Address the specific friction within your current goal.",
               icon: "fas fa-sync"
            },
            { 
               id: "change", 
               title: "Change Focus Area", 
               description: "Shift to a completely different domain of your life.",
               icon: "fas fa-compass"
            }
          ]
        },
        {
          type: "primary_button",
          label: "Next →",
          action: {
            type: "submit",
            payload: { step: "re_analysis_proceed" }
          },
          style: "gold",
          position: "footer"
        }
      ]
    },

    re_analysis_focus_select: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        {
          type: "headline",
          content: "In which area do you want to target?",
          position: "header",
        },
        {
          type: "subtext",
          content: "Which area are you feeling like that now?",
          position: "header",
        },
        {
          type: "choice_card",
          id: "scan_focus",
          selection_mode: "manual",
          options: [
            { id: "careerprosperity", title: "Career & Prosperity", description: "For leadership, success, and wealth." },
            { id: "peacecalm", title: "Peace & Calm", description: "For clarity and silencing the noise." },
            { id: "emotionalhealing", title: "Emotional Healing", description: "For release and heart connection." },
            { id: "focusmotivation", title: "Focus & Motivation", description: "For mental drive and sharp clarity." },
            { id: "gratitudepositivity", title: "Gratitude & Positivity", description: "For joy and attracting abundance." },
            { id: "healthwellbeing", title: "Health & Wellbeing", description: "For physical vigor and balance." },
            { id: "spiritualgrowth", title: "Spiritual Growth", description: "For deep connection and wisdom." },
          ],
        },
        {
          type: "primary_button",
          label: "Continue →",
          action: {
            type: "navigate",
            target: { container_id: "stable_scan", state_id: "prana_baseline" },
          },
          style: "gold",
          position: "footer",
        },
      ],
    },

    // 1️⃣1️⃣ RESET WITH AWARENESS
    reset_with_awareness: {
      tone: { theme: "light_sandal", mood: "neutral" },

      blocks: [
        { type: "headline", content: "Reset with awareness." },
        {
          type: "primary_button",
          label: "Return to Portal",
          action: {
            type: "navigate",
            target: { container_id: "portal", state_id: "portal" },
          },
        },
      ],
    },
  },
};
export const StableScanContainer = {
  container_id: "stable_scan",
  states: {
    prana_baseline: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [
        {
          type: "headline",
          content: "Reflecting on your Path.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Where do you stand today in this area? Be honest.",
          position: "header",
        },
        {
          id: "prana_baseline_selection",
          type: "chip_list",
          label: "YOUR CURRENT STATE",
          options: [],
        },
        {
          type: "primary_button",
          label: "Set My Baseline →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              state_id: "depth_selection",
            },
          },
          style: "gold",
          position: "footer",
        },
      ],
      optionsMap: {
        careerprosperity: [
          { id: "stagnant", label: "Feeling Stagnant" },
          { id: "undervalued", label: "Undervalued" },
          { id: "imposter", label: "Imposter Syndrome" },
          { id: "directionless", label: "Lack of Direction" },
          { id: "work_overwhelm", label: "Work Overwhelm" },
        ],
        peacecalm: [
          { id: "overthinking", label: "Overthinking" },
          { id: "restless", label: "Internal Restlessness" },
          { id: "anxious", label: "Anxious Energy" },
          { id: "noisy", label: "Mental Noise" },
          { id: "scattered", label: "Scattered Focus" },
        ],
        emotionalhealing: [
          { id: "heavy_heart", label: "Heavy Heart" },
          { id: "resentful", label: "Feeling Resentful" },
          { id: "lonely", label: "Loneliness" },
          { id: "disconnected", label: "Disconnected" },
          { id: "grieving", label: "Emotional Weight" },
        ],
        focusmotivation: [
          { id: "distracted", label: "Highly Distracted" },
          { id: "uninspired", label: "Uninspired" },
          { id: "procrastinating", label: "Procrastinating" },
          { id: "mental_fog", label: "Mental Fog" },
          { id: "low_drive", label: "Low Drive" },
        ],
        gratitudepositivity: [
          { id: "cynical", label: "Feeling Cynical" },
          { id: "lack_mindset", label: "Focusing on Lack" },
          { id: "pessimistic", label: "Pessimistic" },
          { id: "unappreciated", label: "Unappreciated" },
          { id: "comparing", label: "Comparison Trap" },
        ],
        healthwellbeing: [
          { id: "low_vitality", label: "Low Vitality" },
          { id: "burned_out", label: "Burned Out" },
          { id: "physically_tense", label: "Body Tension" },
          { id: "sluggish", label: "Sluggish" },
          { id: "neglectful", label: "Ignoring Body Needs" },
        ],
        spiritualgrowth: [
          { id: "lost", label: "Spiritually Lost" },
          { id: "void", label: "Inner Void" },
          { id: "meaningless", label: "Meaningless Routine" },
          { id: "material_chain", label: "Materially Bound" },
          { id: "doubting", label: "Doubting the Path" },
        ],
      },
      subCategorySliders: {
        stagnant: [
          { label: "Momentum", value: 3 },
          { label: "Creative Flow", value: 3 },
        ],
        undervalued: [
          { label: "Self-Worth", value: 3 },
          { label: "Recognition", value: 4 },
        ],
        imposter: [
          { label: "Confidence", value: 2 },
          { label: "Internal Truth", value: 4 },
        ],
        directionless: [
          { label: "Vision", value: 3 },
          { label: "Purpose", value: 3 },
        ],
        work_overwhelm: [
          { label: "Structure", value: 2 },
          { label: "Inner Calm", value: 3 },
        ],
        overthinking: [
          { label: "Stillness", value: 2 },
          { label: "Presence", value: 4 },
        ],
        restless: [
          { label: "Groundedness", value: 3 },
          { label: "Peace", value: 3 },
        ],
        anxious: [
          { label: "Breath Depth", value: 3 },
          { label: "Release", value: 2 },
        ],
        noisy: [
          { label: "Internal Silence", value: 2 },
          { label: "Space", value: 3 },
        ],
        scattered: [
          { label: "Singlepoint Focus", value: 3 },
          { label: "Clarity", value: 3 },
        ],
        heavy_heart: [
          { label: "Lightness", value: 2 },
          { label: "Forgiveness", value: 3 },
        ],
        resentful: [
          { label: "Letting Go", value: 3 },
          { label: "Compassion", value: 2 },
        ],
        lonely: [
          { label: "Connection", value: 3 },
          { label: "Self-Love", value: 4 },
        ],
        disconnected: [
          { label: "Internal Union", value: 3 },
          { label: "Awareness", value: 3 },
        ],
        grieving: [
          { label: "Softness", value: 3 },
          { label: "Acceptance", value: 4 },
        ],
        distracted: [
          { label: "Attention Span", value: 2 },
          { label: "Silence", value: 4 },
        ],
        uninspired: [
          { label: "Creative Spark", value: 3 },
          { label: "Drive", value: 3 },
        ],
        procrastinating: [
          { label: "Willpower", value: 2 },
          { label: "Impact", value: 3 },
        ],
        mental_fog: [
          { label: "Sharpness", value: 2 },
          { label: "Alertness", value: 3 },
        ],
        low_drive: [
          { label: "Energy", value: 3 },
          { label: "Ambition", value: 3 },
        ],
        cynical: [
          { label: "Openness", value: 3 },
          { label: "Faith", value: 2 },
        ],
        lack_mindset: [
          { label: "Abundance", value: 2 },
          { label: "Gratitude", value: 4 },
        ],
        pessimistic: [
          { label: "Hope", value: 3 },
          { label: "Optimism", value: 2 },
        ],
        unappreciated: [
          { label: "Contribution", value: 4 },
          { label: "Joy", value: 3 },
        ],
        comparing: [
          { label: "Uniqueness", value: 4 },
          { label: "Contentment", value: 3 },
        ],
        low_vitality: [
          { label: "Prana Flow", value: 3 },
          { label: "Internal Fire", value: 2 },
        ],
        burned_out: [
          { label: "Nourishment", value: 2 },
          { label: "Restoration", value: 3 },
        ],
        physically_tense: [
          { label: "Release", value: 3 },
          { label: "Fluidity", value: 4 },
        ],
        sluggish: [
          { label: "Metabolism", value: 3 },
          { label: "Vigor", value: 2 },
        ],
        neglectful: [
          { label: "Body Love", value: 3 },
          { label: "Self-Care", value: 2 },
        ],
        lost: [
          { label: "Path Clarity", value: 3 },
          { label: "Inner Guide", value: 2 },
        ],
        void: [
          { label: "Fullness", value: 3 },
          { label: "Sacred Touch", value: 3 },
        ],
        meaningless: [
          { label: "Sacredness", value: 2 },
          { label: "Meaning", value: 4 },
        ],
        material_chain: [
          { label: "Detachment", value: 3 },
          { label: "Freedom", value: 2 },
        ],
        doubting: [
          { label: "Trust", value: 2 },
          { label: "Faith", value: 3 },
        ],
      },
    },
  },
};

export const ContainerRegistry = {
  portal: PortalContainer,
  choice_stack: ChoiceStackContainer,
  composer: ComposerContainer,
  lock_ritual_overlay: LockRitualContainer,
  routine_builder: RoutineBuilderContainer,
  routine_locked: RoutineLockedContainer,
  companion_dashboard: CompanionDashboardContainer,
  practice_runner: PracticeRunnerContainer,
  embodiment_challenge_runner: EmbodimentChallengeRunnerContainer,
  awareness_trigger: AwarenessTriggerContainer,
  insights_progress: InsightsProgressContainer,
  cycle_transitions: CycleTransitionsContainer,
  stable_scan: StableScanContainer,
  demo_container: {
    container_id: "demo_container",
    states: {
      server_style_demo: {
        style: {
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "40px 20px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        },
        blocks: [
          {
            type: "headline",
            content: "THE SUPREME ARCHITECT",
            style: {
              color: "#facc15",
              fontSize: "42px",
              fontWeight: "900",
              letterSpacing: "8px",
              textShadow: "0 0 20px rgba(250, 204, 21, 0.5)",
              marginBottom: "40px",
              textAlign: "center"
            }
          },
          {
            type: "subtext",
            content: "THIS SCREEN IS DESIGNED ENTIRELY BY THE BACKEND.",
            style: {
              color: "#94a3b8",
              fontSize: "14px",
              letterSpacing: "2px",
              marginBottom: "60px",
              opacity: "0.8"
            }
          },
          {
            type: "choice_card",
            style: {
              gap: "24px"
            },
            options: [
              {
                id: "blue_pill",
                title: "VIBRANT PATH",
                description: "Neon aesthetics and rapid growth.",
                style: {
                  background: "rgba(37, 99, 235, 0.1)",
                  border: "1px solid #2563eb",
                  borderRadius: "20px"
                }
              },
              {
                id: "gold_pill",
                title: "STALWART PATH",
                description: "Deep gold and structural integrity.",
                style: {
                  background: "rgba(201, 168, 76, 0.1)",
                  border: "1px solid #c9a84c",
                  borderRadius: "20px"
                }
              }
            ]
          },
          {
            type: "primary_button",
            label: "RETURN TO REALITY →",
            style: {
              marginTop: "40px",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "50px",
              fontSize: "12px"
            },
            action: { type: "navigate", target: "portal" }
          }
        ]
      },
      day_15_recap: {
        container_id: "spiritual_recalibration", // This container doesn't exist!
        blocks: [
          { type: "micro_label", content: "PROGRESS REPORT", position: "header" },
          { type: "headline", content: "Day 15: The New You", position: "header" },
          { type: "subtext", content: "After two cycles, your neural pathways have shifted.", position: "header" },
          {
            type: "insight_box",
            items: [
              { text: "Consistency: 96%", subtext: "You missed 0 days." },
              { text: "Awareness: +42%", subtext: "You recorded 15 pauses." }
            ]
          },
          { type: "spacer" },
          {
            type: "primary_button",
            label: "Begin Next Cycle →",
            style_variant: "gold",
            action: { type: "navigate", target: "discipline_select" },
            position: "footer"
          }
        ]
      }
    }
  }
};
