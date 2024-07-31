const mockData = [
  {
    id: 1,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "1번 제품 이름입니다",
    price: "29000",
    category: "의류",
  },
  {
    id: 2,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "2번 제품 이름입니다",
    price: "29000",
    category: "의류",
  },
  {
    id: 3,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "3번 제품 이름입니다",
    price: "29000",
    category: "의류",
  },
  {
    id: 4,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "의류",
  },
  {
    id: 5,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "학용품",
  },
  {
    id: 6,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "학용품",
  },
  {
    id: 7,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "학용품",
  },
  {
    id: 8,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "학용품",
  },
  {
    id: 9,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "스티커",
  },
  {
    id: 10,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "스티커",
  },
  {
    id: 11,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "스티커",
  },
  {
    id: 12,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "스티커",
  },
  {
    id: 13,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "인형",
  },
  {
    id: 14,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "인형",
  },
  {
    id: 15,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "인형",
  },
  {
    id: 16,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "인형",
  },
  {
    id: 17,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "악세서리",
  },
  {
    id: 18,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "악세서리",
  },
  {
    id: 19,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "악세서리",
  },
  {
    id: 20,
    imageSrc:
      "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTky/MDAxNTIwMDQxODU1OTY0.MZsSmhugRX-R3f6ASTwd3oTAtFvsh_NEHrV2SpVHk_Ag.9vP6o2DWWIr6-QJXR8Ydt9g53VijyckSbVp6HMgDfvkg.PNG.osy2201/3_%2860%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800",
    firstTitle: "상점",
    secondTitle: "제품 이름입니다",
    price: "29000",
    category: "악세서리",
  },
];

export default mockData;
