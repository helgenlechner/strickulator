export interface Paginator {
  page_count: number;
  page: number;
  page_size: number;
  results: number;
  last_page: number;
}

export interface RavelryProject {
  comments_count: number;
  completed: string;
  craft_id: number;
  created_at: string;
  favorites_count: number;
  id: number;
  made_for: string;
  made_for_user_id: string | null;
  name: string;
  pattern_id: number | null;
  permalink: string;
  progress: number;
  project_status_changed: number;
  project_status_id: number;
  rating: number;
  size: string;
  started: string;
  updated_at: string;
  user_id: number;
  links: {
    self: {
      href: string;
    };
  };
  pattern_name: string;
  craft_name: string;
  status_name: string;
  tagNames: string[];
  first_photo: Photo;
  photos_count: number;
  ends_per_inch: number | null;
  picks_per_inch: number | null;
  gauge: null;
  row_gauge: null;
  gauge_repeats: null;
  gauge_divisor: null;
  gauge_pattern: string;
  user: User;
}

export interface Photo {
  id: number;
  sort_order: number;
  x_offset: number;
  y_offset: number;
  square_url: string;
  medium_url: string;
  thumbnail_url: string;
  small_url: string;
  medium2_url: string;
  small2_url: string;
  caption: string | null;
  caption_html: string | null;
  copyright_holder: string | null;
}

export interface User {
  id: number;
  username: string;
  tiny_photo_url: string;
  small_photo_url: string;
  photo_url: string;
}

export interface ProjectSearchResponse {
  projects: RavelryProject[];
  paginator: Paginator;
}
