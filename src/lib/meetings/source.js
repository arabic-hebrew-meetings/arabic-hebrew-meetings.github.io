import { getQueryParam } from '../queryParams.js';

// Where the visitor came from (the ?s= link parameter), logged with the page open and room entries.
// Moved from getUserSourceAndMeetingDate() in public/meetingsScript.js. Most keys end with
// "_<meeting date>", e.g. ?s=fpa_10-01. Prefixes are checked in this order.
const SOURCES_WITH_DATE = [
  ['fpa_', 'facebook_palestinian_israeli_announcement'],
  ['fia_', 'facebook_international_announcement'],
  ['fpt_', 'facebook_palestinian_israeli_tonight'],
  ['fit_', 'facebook_international_tonight'],
  ['fpn_', 'facebook_palestinian_israeli_now'],
  ['fin_', 'facebook_international_now'],
  ['fpe_', 'facebook_palestinian_israeli_event'],
  ['fieu_', 'facebook_international_event_url'],
  ['fied_', 'facebook_international_event_details'],
  ['fiet_', 'facebook_international_event_tonight'],
  ['fien_', 'facebook_international_event_now'],
  ['fpc_', 'facebook_palestinian_israeli_comment'],
  ['fic_', 'facebook_international_comment'],
  ['wput_', 'whatsapp_palestinian_israeli_updates_tonight'],
  ['wiut_', 'whatsapp_international_updates_tonight'],
  ['wpun_', 'whatsapp_palestinian_israeli_updates_now'],
  ['wiun_', 'whatsapp_international_updates_now'],
  ['wppt_', 'whatsapp_palestinian_israeli_chats_tonight'],
  ['wppn_', 'whatsapp_palestinian_israeli_chats_now'],
];

const dateFromSource = (source) => source.substring(source.lastIndexOf('_') + 1);

export function getUserSourceAndMeetingDate() {
  const source = getQueryParam('s');
  if (source == null || source == '') {
    return ['unknown_source', 'unknown_date'];
  }
  const match = SOURCES_WITH_DATE.find(([prefix]) => source.startsWith(prefix));
  if (match) {
    return [match[1], dateFromSource(source)];
  }
  if (source.startsWith('dfm')) {
    return ['direct_messege_to_user_from_me', source.includes('_') ? dateFromSource(source) : 'unknown_date'];
  }
  if (source.startsWith('thisisme')) {
    return ['this_is_me', 'unknown_date'];
  }
  if (source.startsWith('menu')) {
    return ['website_menu', 'unknown_date'];
  }
  return [source, 'unknown_date'];
}
