import { IconHeart, IconHistory, IconMovie } from '@tabler/icons-react';
import { Container, Card, Image, Text, ActionIcon, Badge, Group, Center, Avatar, useMantineTheme } from '@mantine/core';
import styled from '@emotion/styled';

const mockData = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/bT3IpP7OopgiVuy6HCPOWLuaFAd.jpg',
      genre_ids: [35, 9648, 28],
      id: 638974,
      original_language: 'en',
      original_title: 'Murder Mystery 2',
      overview:
        '결혼식에서 억만장자 신랑이 납치당한 사건. 탐정 사무소를 차린 닉과 오드리 스피츠에게 이보다 더 대박인 사건은 없을 것.',
      popularity: 3402.836,
      poster_path: '/fLuop1cvcHaZ4ayyzC8SqrUiCX.jpg',
      release_date: '2023-03-31',
      title: '머더 미스터리 2',
      video: false,
      vote_average: 6.6,
      vote_count: 829,
    },
    {
      adult: false,
      backdrop_path: '/tYcmm8XtzRdcT6kliCbHuWwLCwB.jpg',
      genre_ids: [28],
      id: 849869,
      original_language: 'ko',
      original_title: '길복순',
      overview:
        '청부살인이 본업이지만 겉으로 보기에는 평범한 이벤트 회사인 MK 소속 킬러 길복순은 작품은 반드시 완수해 내는 성공률 100%의 킬러이자, 10대 딸을 둔 엄마다. 업계에서는 아무도 범접할 수 없는 에이스지만, 딸 재영과의 관계는 서툴기만 한 싱글맘인 그는 자신과 딸 사이의 벽을 허물기 위해 퇴사까지 결심한다. MK 대표 차민규의 재계약 제안의 답을 미룬 채, 마지막 작품에 들어간 복순은 임무에 숨겨진 진실을 알게 된 후, 회사가 허가한 일은 반드시 시도해야 한다는 규칙을 어기게 된다. 그 소식을 들은 MK는 물론, 모든 킬러들의 타겟이 되고야 마는데…',
      popularity: 1939.099,
      poster_path: '/1MQoYvEIvsCZMpTuBlWfbaliJes.jpg',
      release_date: '2023-03-31',
      title: '길복순',
      video: false,
      vote_average: 6.7,
      vote_count: 164,
    },
    {
      adult: false,
      backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
      genre_ids: [28, 12, 878],
      id: 505642,
      original_language: 'en',
      original_title: 'Black Panther: Wakanda Forever',
      overview:
        '국왕이자 블랙 팬서인 티찰라의 죽음 이후 수많은 강대국으로부터 위협을 받게 된 와칸다. 라몬다, 슈리 그리고 나키아, 오코예, 음바쿠는 각자 사명감을 갖고 와칸다를 지키기 위해 외로운 싸움을 이어간다. 한편, 비브라늄의 패권을 둘러싼 미스터리한 음모와 함께 깊은 해저에서 모습을 드러낸 최강의 적 네이머와 탈로칸의 전사들은 와칸다를 향해 무차별 공격을 퍼붓기 시작하는데…',
      popularity: 1303.324,
      poster_path: '/nPpS4H39AhDD8g5VPt6tQcFJNtL.jpg',
      release_date: '2022-11-09',
      title: '블랙 팬서: 와칸다 포에버',
      video: false,
      vote_average: 7.3,
      vote_count: 4611,
    },
    {
      adult: false,
      backdrop_path: '/gNOyIDGW8YY6AYbz6nMvrVSHSXs.jpg',
      genre_ids: [16, 12, 10751, 14],
      id: 776835,
      original_language: 'en',
      original_title: "The Magician's Elephant",
      overview:
        '오래전 잃어버린 여동생 아델을 찾고 있는 피터가 시장에서 점술가를 만난다. 피터의 마음속에는 단 한 가지 질문밖에 없다. 동생이 아직 살아있을까? 점술가는 그에 대한 답으로 신비한 코끼리와 그 코끼리를 불러낼 마술사를 찾아야 한다고 말한다. 그 후로 불가능해 보이는 세 가지 과제를 완수하기 위해 험난한 여정에 오르는 피터. 이제 마을의 모습은 영원히 바뀌고, 피터에게는 일생일대의 모험이 펼쳐진다.',
      popularity: 704.137,
      poster_path: '/4GolfoFs5QbvAmY2DM6msueAoSd.jpg',
      release_date: '2023-03-17',
      title: '마술사의 코끼리',
      video: false,
      vote_average: 7.2,
      vote_count: 105,
    },
    {
      adult: false,
      backdrop_path: '/nWs0auTqn2UaFGfTKtUE5tlTeBu.jpg',
      genre_ids: [10751, 35, 14],
      id: 668482,
      original_language: 'en',
      original_title: "Roald Dahl's Matilda the Musical",
      overview:
        '명석한 두뇌와 풍부한 상상력을 지닌 특별한 소녀. 자신의 이야기를 바꾸려 당당히 나서자 기적과도 같은 결과가 찾아오는데. 용감한 소녀 마틸다를 만나보세요!',
      popularity: 569.93,
      poster_path: '/ga8R3OiOMMgSvZ4cOj8x7prUNYZ.jpg',
      release_date: '2022-12-25',
      title: '로알드 달의 뮤지컬 마틸다',
      video: false,
      vote_average: 6.8,
      vote_count: 559,
    },
    {
      adult: false,
      backdrop_path: '/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
      genre_ids: [28, 12, 878],
      id: 634649,
      original_language: 'en',
      original_title: 'Spider-Man: No Way Home',
      overview:
        '미스테리오의 계략으로 세상에 정체가 탄로난 스파이더맨 피터 파커는 하루 아침에 평범한 일상을 잃게 된다. 문제를 해결하기 위해 닥터 스트레인지를 찾아가 도움을 청하지만 뜻하지 않게 멀티버스가 열리면서 각기 다른 차원의 불청객들이 나타난다. 닥터 옥토퍼스를 비롯해 스파이더맨에게 깊은 원한을 가진 숙적들의 강력한 공격에 피터 파커는 사상 최악의 위기를 맞게 되는데…',
      popularity: 476.278,
      poster_path: '/voddFVdjUoAtfoZZp2RUmuZILDI.jpg',
      release_date: '2021-12-15',
      title: '스파이더맨: 노 웨이 홈',
      video: false,
      vote_average: 8,
      vote_count: 17214,
    },
    {
      adult: false,
      backdrop_path: '/afsYFdid9pnnRd6tTrHFUbHgXJn.jpg',
      genre_ids: [878],
      id: 843794,
      original_language: 'ko',
      original_title: '정이',
      overview:
        '급격한 기후변화로 지구는 폐허가 되고 인류는 우주에 새로운 터전 쉘터를 만들어 이주한다. 수십 년째 이어지는 내전에서 윤정이는 수많은 작전의 승리를 이끌며 전설의 용병으로 거듭난다. 하지만 단 한 번의 작전 실패로 식물인간이 되고, 군수 A.I. 개발 회사 크로노이드는 그녀의 뇌를 복제해 최고의 A.I. 전투 용병 개발을 시작한다. 35년 후, 정이의 딸 윤서현은 정이 프로젝트의 연구팀장이 되어 전투 A.I. 개발에 힘쓴다. 끝없는 복제와 계속되는 시뮬레이션에도 연구에 진전이 없자, 크로노이드는 정이를 두고 또 다른 프로젝트를 준비한다. 이를 알게 된 서현은 정이를 구하기 위한 계획을 세우는데…',
      popularity: 565.092,
      poster_path: '/qEkatvFb6hrebLBAanb25ea26yh.jpg',
      release_date: '2023-01-20',
      title: '정이',
      video: false,
      vote_average: 6.3,
      vote_count: 432,
    },
    {
      adult: false,
      backdrop_path: '/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg',
      genre_ids: [14, 28, 35],
      id: 616037,
      original_language: 'en',
      original_title: 'Thor: Love and Thunder',
      overview:
        '이너피스를 위해 자아 찾기 여정을 떠난 천둥의 신 토르. 그러나 우주의 모든 신들을 몰살하려는 신 도살자 고르의 등장으로 토르의 안식년 계획은 산산조각 나 버린다. 토르는새로운 위협에 맞서기 위해 킹 발키리, 코르그, 그리고 전 여자친구 제인과 재회하게 되고, 그녀가 묠니르를 휘두르는 마이티 토르가 되어 나타나 모두를 놀라게 한다. 이제 팀 토르는 고르의 복수에 얽힌 미스터리를 밝히고 더 큰 전쟁을 막기 위한 전 우주적 스케일의 모험을 시작하는데...',
      popularity: 538.751,
      poster_path: '/un8ZDtx2SMwNwXRYy65aItnNjab.jpg',
      release_date: '2022-07-06',
      title: '토르: 러브 앤 썬더',
      video: false,
      vote_average: 6.6,
      vote_count: 5802,
    },
    {
      adult: false,
      backdrop_path: '/53BC9F2tpZnsGno2cLhzvGprDYS.jpg',
      genre_ids: [14, 28, 12, 53],
      id: 736526,
      original_language: 'no',
      original_title: 'Troll',
      overview:
        '고대의 전설이 깨어났다! 아주 오랜 세월, 노르웨이의 산에 잠들어 있던 트롤. 녀석이 세상을 파괴하기 전에 막아야 한다. 골칫덩어리 영웅들이 힘을 합쳐야 가능하지만.',
      popularity: 516.894,
      poster_path: '/6MEYnNtvyctpshK0nIi6Kor9Av9.jpg',
      release_date: '2022-12-01',
      title: '트롤의 습격',
      video: false,
      vote_average: 6.7,
      vote_count: 1347,
    },
    {
      adult: false,
      backdrop_path: '/hT9ZUwLN5tB2O7miBu1oIMJFqJT.jpg',
      genre_ids: [12, 28, 878],
      id: 507086,
      original_language: 'en',
      original_title: 'Jurassic World Dominion',
      overview:
        '공룡들의 터전이었던 이슬라 누블라 섬이 파괴된 후,  마침내 공룡들은 섬을 벗어나 세상 밖으로 출몰한다. 지상에 함께 존재해선 안 될 위협적 생명체인 공룡의 등장으로 인류 역사상 겪어보지 못한 사상 최악의 위기를 맞이한 인간들. 지구의 최상위 포식자 자리를 걸고 인간과 공룡의 최후의 사투가 펼쳐진다.',
      popularity: 461.857,
      poster_path: '/odxdUZWZ7fBfy3ZRj063wuJnZvo.jpg',
      release_date: '2022-06-01',
      title: '쥬라기 월드: 도미니언',
      video: false,
      vote_average: 6.9,
      vote_count: 4717,
    },
    {
      adult: false,
      backdrop_path: '/e782pDRAlu4BG0ahd777n8zfPzZ.jpg',
      genre_ids: [16, 14, 18, 10402],
      id: 555604,
      original_language: 'en',
      original_title: "Guillermo del Toro's Pinocchio",
      overview:
        '많은 이들의 사랑을 받은 목각 인형 피노키오의 마법 같은 모험. 현실의 한계를 뛰어넘어, 새 생명을 불어넣는 강력한 사랑의 힘이 펼쳐진다. 이탈리아 고전 동화 "피노키오"가 스톱모션 뮤지컬로 재탄생한다. 말썽꾸러기 피노키오는 과연 인간 소년이 될 수 있을까? 그 여정을 따라가 보자.',
      popularity: 408.163,
      poster_path: '/6bdUtxydFXLtgcxHMMvlkNnRZWg.jpg',
      release_date: '2022-11-23',
      title: '기예르모 델토로의 피노키오',
      video: false,
      vote_average: 8.2,
      vote_count: 2207,
    },
    {
      adult: false,
      backdrop_path: '/sKvQUSyqsFq8e1ts6oo3Xp3dPH2.jpg',
      genre_ids: [16, 12, 35, 14],
      id: 585511,
      original_language: 'en',
      original_title: 'Luck',
      overview:
        "불운의 아이콘 '샘 그린필드'는 어디에서도 본 적 없는 운의 왕국을 우연히 발견하고, 가장 친한 친구에게 행운을 가져다주기 위해 그곳으로의 여행을 계획한다. 하지만 운의 왕국은 인간의 접근을 허락하지 않고, '샘 그린필드'는 여행을 실행에 옮기기 위한 유일한 방법으로 마법의 생명체들로부터 도움을 받게 된다.",
      popularity: 385.543,
      poster_path: '/nN2iHej7TyISjXC6Jl577aqpDHJ.jpg',
      release_date: '2022-08-05',
      title: '럭',
      video: false,
      vote_average: 7.9,
      vote_count: 1225,
    },
    {
      adult: false,
      backdrop_path: '/xPpXYnCWfjkt3zzE0dpCNME1pXF.jpg',
      genre_ids: [16, 28, 12, 14, 53],
      id: 635302,
      original_language: 'ja',
      original_title: '劇場版「鬼滅の刃」無限列車編',
      overview:
        '혈귀로 변해버린 여동생 네즈코를 인간으로 되돌릴 단서를 찾아 비밀조직 귀살대에 들어간 탄지로. 젠이츠, 이노스케와 새로운 임무 수행을 위해 무한열차에 탑승 후 귀살대 최강 검사 염주 렌고쿠와 합류한다. 달리는 무한열차에서 승객들이 하나 둘 흔적 없이 사라지자 숨어있는 식인 혈귀의 존재를 직감하는 렌고쿠. 귀살대 탄지로 일행과 최강 검사 염주 렌고쿠는 어둠 속을 달리는 무한열차에서 모두의 목숨을 구하기 위해 예측불가능한 능력을 가진 혈귀와 목숨을 건 혈전을 시작하는데...',
      popularity: 405.805,
      poster_path: '/mxdVTei65ymzhJlalIEtR1qSgV2.jpg',
      release_date: '2021-01-27',
      title: '극장판 귀멸의 칼날: 무한열차 편',
      video: false,
      vote_average: 8.2,
      vote_count: 3053,
    },
    {
      adult: false,
      backdrop_path: '/7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg',
      genre_ids: [53, 28, 878],
      id: 766507,
      original_language: 'en',
      original_title: 'Prey',
      overview:
        '300년 전 아메리카, 용맹한 전사를 꿈꾸는 원주민 소녀 나루는 갑작스러운 곰의 습격으로 절체절명의 위기에 놓인 순간, 정체를 알 수 없는 외계 포식자 프레데터를 목격하게 된다.  자신보다 강한 상대를 향한 무자비한 사냥을 시작한 프레데터. 최첨단 기술과 무기로 진화된 외계 포식자 프레데터의 위협이 점점 다가오고 나루는 부족을 지키기 위해 자신만의 기지와 무기로 생존을 건 사투를 시작하는데…',
      popularity: 408.629,
      poster_path: '/eicYAopFKOL3orcNTJZ4TGtZQQ1.jpg',
      release_date: '2022-08-05',
      title: '프레이',
      video: false,
      vote_average: 7.8,
      vote_count: 5401,
    },
    {
      adult: false,
      backdrop_path: '/uMSxXLfH7v30gRNBqsQaSP3yqX5.jpg',
      genre_ids: [16, 35, 10751],
      id: 438148,
      original_language: 'en',
      original_title: 'Minions: The Rise of Gru',
      overview:
        '세계 최고의 슈퍼 악당을 꿈꾸는 미니보스 ‘그루’와 그를 따라다니는 미니언들. 어느 날 그루는 최고의 악당 조직 ‘빌런6’의 마법 스톤을 훔치는 데 성공하지만 뉴페이스 미니언 ‘오토’의 실수로 스톤을 잃어버리고 빌런6에게 납치까지 당한다. 미니보스를 구하기 위해 잃어버린 스톤을 되찾아야 하는 ‘오토’, 그리고 쿵푸를 마스터해야 하는 ‘케빈’, ‘스튜어트’, ‘밥’! 올 여름 극장가를 점령할 MCU(미니언즈 시네마틱 유니버스)가 돌아온다!',
      popularity: 386.094,
      poster_path: '/1heBUD8o0sgdqLWyeXkylR2POKb.jpg',
      release_date: '2022-07-20',
      title: '미니언즈 2',
      video: false,
      vote_average: 7.4,
      vote_count: 2775,
    },
    {
      adult: false,
      backdrop_path: '/9iRRfMZbnpgHDdKi2lczGGYZXDo.jpg',
      genre_ids: [12, 10751, 14],
      id: 411,
      original_language: 'en',
      original_title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
      overview:
        '제2차 세계대전 중의 영국. 공습을 피해 디고리 교수의 시골 별장으로 간 페번시가의 네 남매인 피터, 수잔, 에드먼드, 루시는 마법의 옷장을 통해 신비로운 나라 나니아로 들어선다. 말하는 동물들과 켄타우로스, 거인들이 평화롭게 어울려 사는 땅이었던 나니아는 사악한 하얀 마녀 제이디스에 의해 긴 겨울에 감금되어 있다. 게다가 이 겨울에는 크리스마스도 없다. 호기심 많은 루시, 퉁명스러운 에드먼드, 신중한 수잔, 분별 있는 맏이 피터는 고귀한 사자 아슬란의 인도로 제이디스의 싸늘한 주문을 깨는 싸움에 가담한다.',
      popularity: 344.965,
      poster_path: '/vSY6MgDWD5Ch5I87X8BaxZyydCI.jpg',
      release_date: '2005-12-29',
      title: '나니아 연대기: 사자, 마녀 그리고 옷장',
      video: false,
      vote_average: 7.1,
      vote_count: 9477,
    },
    {
      adult: false,
      backdrop_path: '/iKUwhA4DUxMcNKu5lLSbDFwwilk.jpg',
      genre_ids: [14, 28, 12],
      id: 453395,
      original_language: 'en',
      original_title: 'Doctor Strange in the Multiverse of Madness',
      overview:
        '아메리카는 어느 날 멀티버스 사이를 오갈 수 있는 힘에 눈을 뜨지만 완전히 제어하지 못한다. 정체불명의 악마가 아메리카를 죽이려 하자 다른 우주의 스트레인지가 이를 막아보지만 결국 살해당한다. 우여곡절 끝에 우리가 알고 있는 우주로 넘어온 아메리카는 어벤져스 멤버인 닥터 스트레인지의 도움과 보호를 받는다. 닥터 스트레인지는 웨스트뷰 사건 이후 잠적한 완다에게 도움을 청하지만 곧바로 그녀가 사건의 진정한 흑막, 스칼렛 위치임이 드러난다. 스칼렛 위치는 자신의 원하는 멀티버스로 가기 위해 아메리카의 힘을 흡수하려 한다. 닥터 스트레인지와 아메리카는 압도적인 힘을 지닌 스칼렛 위치를 피해 또 한번 다른 멀티버스로 도망치지만 그의 끈질긴 추격을 받는다.',
      popularity: 368.469,
      poster_path: '/vL5ktZauR0fZMDOHKjakb1idhuU.jpg',
      release_date: '2022-05-04',
      title: '닥터 스트레인지: 대혼돈의 멀티버스',
      video: false,
      vote_average: 7.4,
      vote_count: 7301,
    },
    {
      adult: false,
      backdrop_path: '/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg',
      genre_ids: [16, 10751, 35, 14],
      id: 508947,
      original_language: 'en',
      original_title: 'Turning Red',
      overview:
        '엄마의 착한 딸, 아니면 미운 13살? 성적도 우수하고 친구들과 사이도 좋은 데다 부모와도 친밀한 관계를 유지하고 있는, 똑 부러지면서도 엉뚱한 매력의 소유자 메이는 요즘 질풍노도의 시기를 겪느라 고민이 많다. 이 나이에 엄마의 과잉보호를 받자니 스트레스가 이만저만이 아닌 데다, 관심사, 인간관계, 신체 등 그녀의 모든 것이 변하고 있기 때문. 그런데 이 와중에 흥분하면 거대한 레서판다로 변신하는 비밀까지 떠안게 되다니! 아침도 먹어야 하고 학교도 가야 하는데, 이 엄청난 비밀을 어떻게 숨겨야 할까?',
      popularity: 345.902,
      poster_path: '/hsOhOcX7qDy7bPwbrt1OoITngrf.jpg',
      release_date: '2022-03-11',
      title: '메이의 새빨간 비밀',
      video: false,
      vote_average: 7.5,
      vote_count: 4105,
    },
    {
      adult: false,
      backdrop_path: '/5pMy5LF2JAleBNBtuzizfCMWM7k.jpg',
      genre_ids: [10752, 36, 18],
      id: 653851,
      original_language: 'en',
      original_title: 'Devotion',
      overview:
        '미 해군 최초의 흑인 파일럿 제시 브라운. 한국 전쟁에서 위험을 무릅쓴 비행에 나선다. 그리고 그의 곁에는 생사를 함께하는 윙맨 톰 허드너가 있다.',
      popularity: 388.76,
      poster_path: '/hr3pwgybefqvtrGJ57mu1MmMdWu.jpg',
      release_date: '2023-01-20',
      title: '디보션',
      video: false,
      vote_average: 7.3,
      vote_count: 440,
    },
    {
      adult: false,
      backdrop_path: '/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg',
      genre_ids: [16, 35, 10751, 14],
      id: 568124,
      original_language: 'en',
      original_title: 'Encanto',
      overview:
        '콜롬비아의 깊은 산 속, 놀라운 마법과 활기찬 매력이 넘치는 세계 엔칸토. 이곳을 만든 장본인은 마드리갈 가문의 기둥인 알마 할머니다. 그녀는 젊었을 때 세 쌍둥이를 데리고 이곳으로 오던 중에 위기를 맞았다. 그때 그녀가 들고 있던 촛불에 기적이 일어났고 그이후로 마법의 능력이 손주 세대까지 대물림된다. 3대에 걸친 이대가족은 음식으로 병을 고치는 능력, 꽃을 피우는 능력, 날씨를 조종 하는 능력 등 저마다 독특한 능력을 지니게 됐다. 하지만 가족 중 유일하게 미라벨만 아무런 능력이 없다. 어느 날 엔칸토가 지닌 마법의 힘이 위험에 처하고 가족들은 점차 자신의 능력을 잃어가기 시작한다. 이를 감지한 미라벨은 유일하게 평범한 자신이 특별한 이 가족의 마지막 희망일지 모른다고 생각하는데...',
      popularity: 347.018,
      poster_path: '/b8gz7UKMwMz39mz6EH5Jjicjdth.jpg',
      release_date: '2021-11-24',
      title: '엔칸토: 마법의 세계',
      video: false,
      vote_average: 7.6,
      vote_count: 8127,
    },
  ],
  total_pages: 288,
  total_results: 5759,
};

const genres = {
  28: {
    name: '액션',
    color: 'red',
  },
  12: {
    name: '모험',
    color: 'pink',
  },
  16: {
    name: '애니메이션',
    color: 'grape',
  },
  35: {
    name: '코미디',
    color: 'violet',
  },
  80: {
    name: '범죄',
    color: 'indigo',
  },
  99: {
    name: '다큐멘터리',
    color: 'blue',
  },
  18: {
    name: '드라마',
    color: 'cyan',
  },
  10751: {
    name: '가족',
    color: 'teal',
  },
  14: {
    name: '판타지',
    color: 'green',
  },
  36: {
    name: '역사',
    color: 'lime',
  },
  27: {
    name: '공포',
    color: 'yellow',
  },
  10402: {
    name: '음악',
    color: 'orange',
  },
  9648: {
    name: '미스터리',
    color: 'red',
  },
  10749: {
    name: '로맨스',
    color: 'pink',
  },
  878: {
    name: 'SF',
    color: 'grape',
  },
  10770: {
    name: 'TV 영화',
    color: 'violet',
  },
  53: {
    name: '스릴러',
    color: 'indigo',
  },
  10752: {
    name: '전쟁',
    color: 'blue',
  },
  37: {
    name: '서부',
    color: 'cyan',
  },
};

const StyledCard = styled(Card)``;

const Cover = styled(Container)`
  position: absolute;
  background-color: ${({ theme }) => `var(--mantine-color-${theme.colorScheme === 'dark' ? 'dark-9' : 'gray-1'})`};
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 80%;
`;

const HoverContainer = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled(Text)`
  display: 'block';
  margin-top: var(--mantine-spacing-md);
  margin-bottom: rem(5);
`;

const Action = styled(ActionIcon)`
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0])};

  &:hover {
    background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1])};
  }
`;

const Footer = styled(Group)`
  margin-top: var(--mantine-spacing-md);
  align-items: flex-start;
  flex-direction: column;
`;

const ArticleCard = ({ id, title, originalTitle, posterPath, overview, releaseDate, genreIds }) => {
  const theme = useMantineTheme();

  return (
    <StyledCard w={252} radius="md">
      <Card.Section>
        <Image src={`https://image.tmdb.org/t/p/w342${posterPath}` || undefined} />
        <Cover />
      </Card.Section>
      <HoverContainer>
        <Container p={0} mb={'sm'}>
          <Title fw={600}>{title}</Title>
          <Text fz="sm" color="dimmed" fw={300}>
            {originalTitle}
          </Text>
        </Container>
        <Container p={0} mb={'sm'}>
          <Text fw={300} fz="xs" color="dimmed" lineClamp={4}>
            {overview}
          </Text>
        </Container>
        <Footer position="apart">
          <Center>
            {genreIds.map(id => (
              <Badge color={genres[id].color} key={id}>
                {genres[id].name}
              </Badge>
            ))}
            <Text fz="sm" inline>
              {releaseDate}
            </Text>
          </Center>
          <Group spacing={8} mr={0}>
            <Action>
              <IconMovie size="1rem" color={theme.colors.yellow[7]} />
            </Action>
            <Action>
              <IconHeart size="1rem" color={theme.colors.red[6]} />
            </Action>
            <Action>
              <IconHistory size="1rem" />
            </Action>
          </Group>
        </Footer>
      </HoverContainer>
    </StyledCard>
  );
};

const Cards = () => {
  const { results: movies } = mockData;

  return (
    <div>
      {movies.map(
        ({
          id,
          title,
          original_title: originalTitle,
          poster_path: posterPath,
          genre_ids: genreIds,
          overview,
          release_date: releaseDate,
        }) => (
          <ArticleCard
            key={id}
            title={title}
            classsize={'medium'}
            originalTitle={originalTitle}
            posterPath={posterPath}
            genreIds={genreIds}
            overview={overview}
            release_date={releaseDate}
          />
        )
      )}
    </div>
  );
};
export default Cards;
