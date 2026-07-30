import gallery1 from '../assets/images/gallery-1.jpg'
import gallery2 from '../assets/images/gallery-2.jpg'
import gallery3 from '../assets/images/gallery-3.jpg'
import gallery4 from '../assets/images/gallery-4.jpg'
import gallery5 from '../assets/images/gallery-5.jpg'
import gallery6 from '../assets/images/gallery-6.jpg'
import gallery7 from '../assets/images/gallery-7.jpg'
import gallery8 from '../assets/images/gallery-8.jpg'
import gallery9 from '../assets/images/gallery-9.jpg'
import gallery10 from '../assets/images/gallery-10.jpg'
import gallery11 from '../assets/images/gallery-11.jpg'
import gallery12 from '../assets/images/gallery-12.jpg'
import timeline1 from '../assets/images/timeline-1.jpg'
import timeline2 from '../assets/images/timeline-2.jpg'
import timeline3 from '../assets/images/timeline-3.jpg'
import audioCover from '../assets/images/audio-cover.jpg'

/** Nguồn: CHIẾN KHU Đ_BTU.docx */
export const SITE = {
  name: 'Di tích lịch sử Chiến khu Đ',
  address:
    'Ấp Đá Bàn, xã Bắc Tân Uyên, Thành phố Hồ Chí Minh',
  lat: 11.1307,
  lng: 106.8659,
  coordsDisplay: `11°7'50.53"N, 106°51'57.22"E`,
  hours: '07:00 – 18:00',
  hoursNote: 'Mở cửa hằng ngày',
  ticketFree: true,
  management: 'Bảo tàng tỉnh Bình Dương',
  managementAddress:
    'Số 565 Đại lộ Bình Dương, thành phố Thủ Dầu Một, Thành phố Hồ Chí Minh',
  phone: '(0274) 3 841 606',
  /** Cập nhật email chính thức của Bảo tàng khi có */
  email: '',
  memorialAreaHa: 39.8,
  nationalRankDate: '11/5/2010',
}

export const historyStages = [
  {
    id: 'formation',
    titleVn: 'Hình thành',
    titleEn: 'Formation',
    descVn:
      'Ngày 20/2/1946, hội nghị tại Lạc An quyết định thành lập căn cứ địa kháng chiến — Chiến khu Đ — trên hạt nhân 5 xã Tân Hòa, Mỹ Lộc, Tân Tịch, Thường Lang và Lạc An.',
    descEn:
      'On 20 Feb 1946, a conference at Lac An established War Zone D on five communes: Tan Hoa, My Loc, Tan Tich, Thuong Lang and Lac An.',
  },
  {
    id: 'france',
    titleVn: 'Chống Pháp',
    titleEn: 'Against France',
    descVn:
      '1946–1954: căn cứ của Khu 7, nơi đứng chân chi đội 10 (Huỳnh Văn Nghệ), nhiều trận đánh Bảo Chánh, La Ngà, cầu Bà Kiên…',
    descEn:
      '1946–1954: Zone 7 base, home of Detachment 10 under Huynh Van Nghe, with battles at Bao Chanh, La Nga, Ba Kien bridge…',
  },
  {
    id: 'america',
    titleVn: 'Chống Mỹ',
    titleEn: 'Against America',
    descVn:
      '1954–1975: khôi phục căn cứ, Trung ương Cục miền Nam tại Mã Đà (1961), bàn đạp Tổng tiến công 1968 và Chiến dịch Hồ Chí Minh 1975.',
    descEn:
      '1954–1975: base restored; COSVN at Ma Da (1961); springboard for 1968 Offensive and 1975 Ho Chi Minh Campaign.',
  },
  {
    id: 'today',
    titleVn: 'Hiện nay',
    titleEn: 'Today',
    descVn:
      'Di tích lịch sử cấp quốc gia (11/5/2010). Khu tưởng niệm gần 39,8 ha bên hồ Đá Bàn, đài tưởng niệm cao 46 m.',
    descEn:
      'National historic site (11 May 2010). Memorial park of ~39.8 ha by Da Ban Lake, with a 46 m monument.',
  },
]

export type GalleryCategory = 'all' | 'current' | 'archive' | 'video'

export const galleryItems = [
  {
    id: 1,
    image: gallery1,
    category: 'current' as GalleryCategory,
    titleVn: 'Bia Làng chiến đấu 5 xã',
    titleEn: 'Five-commune fighting village stele',
    descVn: 'Bia tưởng niệm với câu thơ của Huỳnh Văn Nghệ tại khu di tích.',
    descEn: 'Memorial stele with a verse by Huynh Van Nghe at the historic site.',
  },
  {
    id: 2,
    image: gallery2,
    category: 'current' as GalleryCategory,
    titleVn: 'Công trình thờ tự trong khu di tích',
    titleEn: 'Shrine building at the site',
    descVn: 'Ngôi nhà truyền thống mái ngói đỏ giữa rừng cao su Đất Cuốc.',
    descEn: 'Traditional red-tiled shrine amid the Dat Cuoc rubber forest.',
  },
  {
    id: 3,
    image: gallery3,
    category: 'current' as GalleryCategory,
    titleVn: 'Nhà tưởng niệm Tổ quốc ghi công',
    titleEn: 'Fatherland Remembers pavilion',
    descVn: 'Bàn thờ và bia ghi danh trong không gian tưởng niệm.',
    descEn: 'Altar and memorial steles inside the commemorative pavilion.',
  },
  {
    id: 4,
    image: gallery4,
    category: 'archive' as GalleryCategory,
    titleVn: 'Mô hình làng kháng chiến chống Pháp',
    titleEn: 'Anti-French resistance village model',
    descVn: 'Biển giới thiệu mô hình làng kháng chiến tại khu trưng bày ngoài trời.',
    descEn: 'Sign for the outdoor anti-French resistance village model.',
  },
  {
    id: 5,
    image: gallery5,
    category: 'archive' as GalleryCategory,
    titleVn: 'Lán trại trong rừng',
    titleEn: 'Thatched huts in the forest',
    descVn: 'Mô hình nhà tranh vách phên nứa tái hiện căn cứ trong rừng.',
    descEn: 'Thatched bamboo-wall huts reconstructing the wartime forest base.',
  },
  {
    id: 6,
    image: gallery6,
    category: 'archive' as GalleryCategory,
    titleVn: 'Căn cứ Khu ủy Khu 7 (1946–1947)',
    titleEn: '7th Zone Party Committee base (1946–1947)',
    descVn: 'Biển mô hình căn cứ Khu ủy Khu 7 thời kỳ đầu kháng chiến.',
    descEn: 'Sign for the early-resistance 7th Zone Party Committee base model.',
  },
  {
    id: 7,
    image: gallery7,
    category: 'current' as GalleryCategory,
    titleVn: 'Tượng đài chi tiết nhân vật',
    titleEn: 'Monument figure detail',
    descVn: 'Cận cảnh nhóm tượng trên đài tưởng niệm.',
    descEn: 'Close-up of sculpted figures on the memorial monument.',
  },
  {
    id: 8,
    image: gallery8,
    category: 'current' as GalleryCategory,
    titleVn: 'Nhà trưng bày / hội trường',
    titleEn: 'Exhibition / assembly hall',
    descVn: 'Công trình mái ngói cam trong khu vực di tích.',
    descEn: 'Orange-tiled hall within the historic site grounds.',
  },
  {
    id: 9,
    image: gallery9,
    category: 'archive' as GalleryCategory,
    titleVn: 'Mô hình Miếu Bà Đất Cuốc',
    titleEn: 'Model: Shrine of Lady in Dat Cuoc',
    descVn: 'Mô hình miếu truyền thống gắn với vùng đất Đất Cuốc.',
    descEn: 'Scale model of the traditional Dat Cuoc shrine.',
  },
  {
    id: 10,
    image: gallery10,
    category: 'current' as GalleryCategory,
    titleVn: 'Nhà dài truyền thống',
    titleEn: 'Traditional longhouse pavilion',
    descVn: 'Công trình cột gỗ mái ngói trong khu tưởng niệm.',
    descEn: 'Wooden-column tiled pavilion in the memorial area.',
  },
  {
    id: 11,
    image: gallery11,
    category: 'current' as GalleryCategory,
    titleVn: 'Toàn cảnh tượng đài',
    titleEn: 'Monument overview',
    descVn: 'Đài tưởng niệm với hai cánh phù điêu và cột trung tâm.',
    descEn: 'Memorial with twin relief wings and central pillar.',
  },
  {
    id: 12,
    image: gallery12,
    category: 'archive' as GalleryCategory,
    titleVn: 'Chòi nghỉ trong rừng',
    titleEn: 'Open forest shelters',
    descVn: 'Mô hình chòi cột gỗ mái tranh trong không gian căn cứ.',
    descEn: 'Open thatched shelters reconstructing base life in the forest.',
  },
]

export type TimelinePeriod = '1929-1944' | '1945-1954' | '1954-1975' | 'now'

export const timelineEvents = [
  {
    id: 1,
    year: '1929',
    period: '1929-1944' as TimelinePeriod,
    tagVn: 'SƠ KHAI',
    tagEn: 'ORIGINS',
    tagColor: 'bg-muted',
    titleVn: 'Chi bộ Đảng tại Phú Riềng',
    titleEn: 'Party cell at Phu Rieng',
    descVn:
      'Năm 1929, chi bộ Đảng Cộng sản ra đời tại Phú Riềng — tiền đề tổ chức cách mạng ở vùng đất đỏ miền Đông. Cuối 1936, chi bộ tại Mỹ Lộc (Tân Uyên) tiếp tục hình thành với các đồng chí Lê Văn Tôn, Huỳnh Liễn, Nguyễn Hồng Kỳ…',
    descEn:
      'In 1929 a Communist Party cell formed at Phu Rieng — an early seed of organization in the eastern red earth. By late 1936 a cell at My Loc (Tan Uyen) followed.',
    image: timeline1,
    linkType: 'learn' as const,
    side: 'right' as const,
  },
  {
    id: 2,
    year: '1946',
    period: '1945-1954' as TimelinePeriod,
    tagVn: 'KHÁNG CHIẾN',
    tagEn: 'RESISTANCE',
    tagColor: 'bg-primary',
    titleVn: 'Thành lập Chiến khu Đ',
    titleEn: 'Establishment of War Zone D',
    descVn:
      'Ngày 20/2/1946, Khu bộ Khu 7 tổ chức hội nghị tại Lạc An, quyết định thành lập căn cứ địa kháng chiến mang mật danh Đ trong chuỗi A, B, C, Đ. Từ một căn cứ của Biên Hòa, nơi đây trở thành căn cứ quan trọng của Nam Bộ.',
    descEn:
      'On 20 Feb 1946, Zone 7 command met at Lac An and founded the resistance base code-named Đ in the A–B–C–Đ series. From a Bien Hoa foothold it grew into a major Nam Bo base.',
    image: timeline2,
    linkType: 'docs' as const,
    side: 'left' as const,
  },
  {
    id: 3,
    year: '1961',
    period: '1954-1975' as TimelinePeriod,
    tagVn: 'CHỐNG MỸ',
    tagEn: 'ANTI-US',
    tagColor: 'bg-[#1B3022]',
    titleVn: 'Trung ương Cục miền Nam tại Mã Đà',
    titleEn: 'COSVN established at Ma Da',
    descVn:
      'Từ tháng 1–3/1961, Trung ương Cục miền Nam được thành lập tại Mã Đà. Chiến khu Đ trở thành trung tâm chỉ đạo chiến lược, gắn với trận Phước Thành (9/1961) và nhiều chiến dịch về sau.',
    descEn:
      'From Jan–Mar 1961, COSVN was established at Ma Da. War Zone D became a strategic command hub, linked to Phuoc Thanh (Sep 1961) and later campaigns.',
    image: timeline3,
    linkType: 'audio' as const,
    side: 'right' as const,
  },
  {
    id: 4,
    year: '1975',
    period: '1954-1975' as TimelinePeriod,
    tagVn: 'GIẢI PHÓNG',
    tagEn: 'LIBERATION',
    tagColor: 'bg-primary',
    titleVn: 'Bàn đạp Chiến dịch Hồ Chí Minh',
    titleEn: 'Springboard for Ho Chi Minh Campaign',
    descVn:
      'Ngày 9–21/4/1975, Chiến khu Đ là khu vực tập kết, triển khai lực lượng liên quan chiến dịch giải phóng Phước Long, Long Khánh – Xuân Lộc, mở đường cho Chiến dịch Hồ Chí Minh. 30/4/1975 kết thúc gần ba thập niên tồn tại của căn cứ.',
    descEn:
      'On 9–21 Apr 1975, War Zone D was a staging area for campaigns freeing Phuoc Long and Long Khanh–Xuan Loc, opening the Ho Chi Minh Campaign. 30 Apr 1975 ended nearly three decades as a base.',
    image: timeline2,
    linkType: 'learn' as const,
    side: 'left' as const,
  },
  {
    id: 5,
    year: '2010',
    period: 'now' as TimelinePeriod,
    tagVn: 'DI TÍCH',
    tagEn: 'HERITAGE',
    tagColor: 'bg-muted',
    titleVn: 'Xếp hạng di tích lịch sử cấp quốc gia',
    titleEn: 'Ranked as national historic site',
    descVn:
      'Ngày 11/5/2010, Chiến khu Đ được xếp hạng di tích lịch sử cấp quốc gia. Khu tưởng niệm gần 39,8 ha tại vùng Đất Cuốc (nay thuộc xã Bắc Tân Uyên) được quy hoạch để giữ lại yếu tố gốc của căn cứ năm xưa.',
    descEn:
      'On 11 May 2010, War Zone D was ranked a national historic site. A ~39.8 ha memorial at Dat Cuoc (now Bac Tan Uyen) preserves the original character of the wartime base.',
    image: gallery2,
    linkType: 'docs' as const,
    side: 'right' as const,
  },
]

const audioUrl = (file: string) =>
  `${import.meta.env.BASE_URL}tracks/${file}`

/** File thật trong public/tracks/ (đổi tên từ bản gốc trong src/assets/audio). */
export const playlist = [
  {
    id: 't1',
    src: audioUrl('01-mo-dau.m4a'),
    periodVn: 'GIỚI THIỆU',
    periodEn: 'INTRODUCTION',
    titleVn: 'Mở đầu',
    titleEn: 'Opening',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Lời dẫn mở đầu thuyết minh di tích',
    subtitleEn: 'Opening narration for the historic site',
    descVn:
      'Phần mở đầu chương trình thuyết minh về Di tích lịch sử Chiến khu Đ.',
    descEn: 'Opening segment of the War Zone D historic site audio guide.',
  },
  {
    id: 't2',
    src: audioUrl('02-vi-tri-hinh-thanh.m4a'),
    periodVn: 'HÌNH THÀNH',
    periodEn: 'FORMATION',
    titleVn: 'Vị trí & giai đoạn hình thành',
    titleEn: 'Location & formation',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Thông tin tham quan và nguồn gốc căn cứ 1946',
    subtitleEn: 'Visitor info and origins of the 1946 base',
    descVn:
      'Giới thiệu vị trí di tích, giờ mở cửa và giai đoạn hình thành Chiến khu Đ từ hội nghị Lạc An ngày 20/2/1946.',
    descEn:
      'Introduces the site location, opening hours, and formation from the Lac An conference on 20 Feb 1946.',
  },
  {
    id: 't3',
    src: audioUrl('03-chong-phap-1-2.m4a'),
    periodVn: 'THỜI KỲ CHỐNG PHÁP',
    periodEn: 'ANTI-FRENCH PERIOD',
    titleVn: 'Kháng chiến chống Pháp (đoạn 1–2)',
    titleEn: 'Anti-French resistance (parts 1–2)',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Xây dựng căn cứ và thế trận 1945–1950',
    subtitleEn: 'Building the base and front, 1945–1950',
    descVn:
      'Quá trình dựng căn cứ, chi đội 10 do Huỳnh Văn Nghệ chỉ huy và các hoạt động đầu kháng chiến chống Pháp.',
    descEn:
      'Establishing the base, Detachment 10 under Huynh Van Nghe, and early anti-French operations.',
  },
  {
    id: 't4',
    src: audioUrl('04-chong-phap-3-4.m4a'),
    periodVn: 'THỜI KỲ CHỐNG PHÁP',
    periodEn: 'ANTI-FRENCH PERIOD',
    titleVn: 'Kháng chiến chống Pháp (đoạn 3–4)',
    titleEn: 'Anti-French resistance (parts 3–4)',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Củng cố căn cứ đến Hiệp định Geneva 1954',
    subtitleEn: 'Consolidating until the 1954 Geneva Accords',
    descVn:
      'Các trận đánh tiêu biểu, hội nghị cán bộ Thủ Biên và vai trò Chiến khu Đ đến năm 1954.',
    descEn:
      'Key battles, Thu Bien cadre conferences, and War Zone D’s role through 1954.',
  },
  {
    id: 't5',
    src: audioUrl('05-chong-my-1-2.m4a'),
    periodVn: 'THỜI KỲ CHỐNG MỸ',
    periodEn: 'ANTI-AMERICAN PERIOD',
    titleVn: 'Kháng chiến chống Mỹ (đoạn 1–2)',
    titleEn: 'Anti-American resistance (parts 1–2)',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Khôi phục căn cứ và Trung ương Cục miền Nam',
    subtitleEn: 'Restoring the base and COSVN',
    descVn:
      'Giai đoạn bí mật 1954–1960, thành lập Trung ương Cục tại Mã Đà và mở rộng căn cứ.',
    descEn:
      'Secret period 1954–1960, COSVN at Ma Da, and expansion of the base.',
  },
  {
    id: 't6',
    src: audioUrl('06-chong-my-3.m4a'),
    periodVn: 'THỜI KỲ CHỐNG MỸ',
    periodEn: 'ANTI-AMERICAN PERIOD',
    titleVn: 'Kháng chiến chống Mỹ (đoạn 3)',
    titleEn: 'Anti-American resistance (part 3)',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Chiến tranh đặc biệt và Tổng tiến công 1968',
    subtitleEn: 'Special War and the 1968 Offensive',
    descVn:
      'Các mốc Phước Thành, Đồng Xoài và vai trò bàn đạp cho Tổng tiến công năm 1968.',
    descEn:
      'Milestones at Phuoc Thanh and Dong Xoai, and the springboard role for 1968.',
  },
  {
    id: 't7',
    src: audioUrl('07-chong-my-4-5.m4a'),
    periodVn: 'THỜI KỲ CHỐNG MỸ',
    periodEn: 'ANTI-AMERICAN PERIOD',
    titleVn: 'Kháng chiến chống Mỹ (đoạn 4–5)',
    titleEn: 'Anti-American resistance (parts 4–5)',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Từ Hiệp định Paris đến mùa Xuân 1975',
    subtitleEn: 'From Paris Accords to Spring 1975',
    descVn:
      'Giữ căn cứ 1969–1973 và tập kết lực lượng mở đường Chiến dịch Hồ Chí Minh tháng 4/1975.',
    descEn:
      'Holding the base 1969–1973 and staging forces for the April 1975 Ho Chi Minh Campaign.',
  },
  {
    id: 't8',
    src: audioUrl('08-tuong-niem-1.m4a'),
    periodVn: 'KHU TƯỞNG NIỆM',
    periodEn: 'MEMORIAL',
    titleVn: 'Khu tưởng niệm hiện nay (đoạn 1)',
    titleEn: 'Memorial today (part 1)',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Quy hoạch khu tưởng niệm hồ Đá Bàn',
    subtitleEn: 'Da Ban Lake memorial planning',
    descVn:
      'Khu tưởng niệm gần 39,8 ha tại vùng Đất Cuốc, cảnh quan xanh bên hồ Đá Bàn.',
    descEn:
      'Memorial park of ~39.8 ha at Dat Cuoc, with green scenery by Da Ban Lake.',
  },
  {
    id: 't9',
    src: audioUrl('09-tuong-niem-2-3.m4a'),
    periodVn: 'KHU TƯỞNG NIỆM',
    periodEn: 'MEMORIAL',
    titleVn: 'Giá trị lịch sử – văn hóa',
    titleEn: 'Historical & cultural value',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Biểu tượng “Miền Đông gian lao mà anh dũng”',
    subtitleEn: 'Symbol of “hard yet heroic Eastern region”',
    descVn:
      'Giá trị lịch sử–văn hóa của Chiến khu Đ và bài thơ “Rừng nhớ người đi” của Huỳnh Văn Nghệ (1946).',
    descEn:
      'Historical–cultural value of War Zone D and Huynh Van Nghe’s poem “The Forest Remembers Those Who Left” (1946).',
  },
  {
    id: 't10',
    src: audioUrl('10-ket-thuc.m4a'),
    periodVn: 'KẾT THÚC',
    periodEn: 'CLOSING',
    titleVn: 'Kết thúc',
    titleEn: 'Closing',
    duration: '--:--',
    durationSec: 0,
    cover: audioCover,
    subtitleVn: 'Lời kết chương trình thuyết minh',
    subtitleEn: 'Closing words of the audio guide',
    descVn: 'Phần kết thúc chương trình thuyết minh di tích Chiến khu Đ.',
    descEn: 'Closing segment of the War Zone D audio guide.',
  },
]

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SITE.lat},${SITE.lng}`

export const visitRouteSteps = [
  {
    vn: 'Xuất phát từ trung tâm TP. Hồ Chí Minh theo hướng Quốc lộ 13 / đường vào Bắc Tân Uyên.',
    en: 'Leave central Ho Chi Minh City toward Highway 13 / roads into Bac Tan Uyen.',
  },
  {
    vn: 'Đến khu vực xã Bắc Tân Uyên, theo biển chỉ dẫn Di tích lịch sử Chiến khu Đ – Ấp Đá Bàn.',
    en: 'In Bac Tan Uyen, follow signs for War Zone D Historic Site – Da Ban hamlet.',
  },
  {
    vn: 'Đến cổng khu tưởng niệm bên hồ Đá Bàn; có bãi đỗ xe phục vụ khách tham quan.',
    en: 'Arrive at the memorial gate by Da Ban Lake; parking is available for visitors.',
  },
]

export const visitRules = [
  {
    vn: 'Không mang vũ khí, chất cháy nổ vào khu di tích.',
    en: 'Do not bring weapons or flammable/explosive materials.',
  },
  {
    vn: 'Giữ gìn vệ sinh, không xả rác, không khắc vẽ lên hiện vật và công trình.',
    en: 'Keep the site clean; no littering or carving on artifacts and structures.',
  },
  {
    vn: 'Trang phục lịch sự, tôn trọng không gian tưởng niệm và hoạt động giáo dục truyền thống.',
    en: 'Dress respectfully and honour the memorial and heritage education space.',
  },
]
