
const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '3622d010-c9f7-4972-9d2a-5881a2d160f4',
        'title': 'Upgrade to a business class',
        'price': 127
      },
      {
        'id': 'd5ab0cf1-abcf-4fd3-a926-c07fc08fb227',
        'title': 'Choose the radio station',
        'price': 82
      },
      {
        'id': 'bcb29bf0-ae7f-4663-b400-7564bcc26b22',
        'title': 'Choose temperature',
        'price': 85
      },
      {
        'id': '2370ef2b-67dd-4af6-afaf-78c544e1599d',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 140
      },
      {
        'id': '3c1b5c92-8ed5-4995-aea9-122cdd90769c',
        'title': 'Drive slowly',
        'price': 146
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': '4da9e314-bbcd-4d55-acb2-da9eafb56fe8',
        'title': 'Infotainment system',
        'price': 188
      },
      {
        'id': 'd49dcb7d-ebbb-4489-90d5-978ee25d31d9',
        'title': 'Order meal',
        'price': 150
      },
      {
        'id': '27fe6f95-2958-408c-b999-473ea38e9c8e',
        'title': 'Choose seats',
        'price': 110
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 'df3aa32c-5527-4772-b7e8-d2b84a949a9a',
        'title': 'Book a taxi at the arrival point',
        'price': 197
      },
      {
        'id': '0f9dcd2c-9e03-4734-9557-49c6c5d85744',
        'title': 'Order a breakfast',
        'price': 54
      },
      {
        'id': '7f1e2143-2f3d-427c-91cd-fa32f9704b06',
        'title': 'Wake up at a certain time',
        'price': 160
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '548b24f8-4181-4908-bcf7-886d66a269d9',
        'title': 'Choose meal',
        'price': 136
      },
      {
        'id': '908d86dc-99ad-4b03-bc6e-01e96d78bf09',
        'title': 'Choose seats',
        'price': 50
      },
      {
        'id': '5a762535-85b3-4662-8843-cccaa67385ca',
        'title': 'Upgrade to comfort class',
        'price': 174
      },
      {
        'id': 'ee711d1c-d19f-46c8-93e1-ae744c5fd8b7',
        'title': 'Upgrade to business class',
        'price': 110
      },
      {
        'id': '7506d733-6a4d-417f-8da7-baefd3574a6e',
        'title': 'Add luggage',
        'price': 33
      },
      {
        'id': 'a42071d8-2ae0-41f4-b6d5-61a6a9c5de08',
        'title': 'Business lounge',
        'price': 96
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '62c20a88-0549-446a-bdc4-e163d895c79f',
        'title': 'Choose the time of check-in',
        'price': 41
      },
      {
        'id': '003acd5c-52b2-4cfe-a957-b1e9eed44f4d',
        'title': 'Choose the time of check-out',
        'price': 169
      },
      {
        'id': 'ec8c7f0f-bfff-4a07-aeab-63fd77a1d096',
        'title': 'Add breakfast',
        'price': 80
      },
      {
        'id': 'a37b22a0-d849-4148-935b-d2a09b842cb6',
        'title': 'Laundry',
        'price': 34
      },
      {
        'id': 'd01515f3-b3a7-4462-80dd-c3a8f40802c6',
        'title': 'Order a meal from the restaurant',
        'price': 68
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 'd8df372c-ecdd-4699-8894-0d6646464f4b',
        'title': 'Choose meal',
        'price': 72
      },
      {
        'id': '90e2a2c2-3ac2-46f8-8b0e-13c8af76b248',
        'title': 'Choose seats',
        'price': 76
      },
      {
        'id': '4fd5e128-6e35-4125-982e-93b9c4630b74',
        'title': 'Upgrade to comfort class',
        'price': 107
      },
      {
        'id': '3938f4c8-ac0d-451c-94e7-873fa8c703ef',
        'title': 'Upgrade to business class',
        'price': 199
      },
      {
        'id': 'fe69e9c0-7784-4f2f-9aad-62a37de7b01a',
        'title': 'Add luggage',
        'price': 177
      },
      {
        'id': 'a73f01d6-7f1c-479d-9673-3afe2e2c91b9',
        'title': 'Business lounge',
        'price': 146
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '19f8e282-f3ae-4131-83f6-5e35f6921b3c',
        'title': 'With automatic transmission',
        'price': 178
      },
      {
        'id': 'cf151bf6-b2a0-429d-babe-1a1d4d996d6b',
        'title': 'With air conditioning',
        'price': 73
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '3c8a9775-673a-4666-b5f4-f14c68d187d8',
        'title': 'Choose live music',
        'price': 181
      },
      {
        'id': 'ca05fdfa-6ad4-4f87-a68f-3502ede0cb2c',
        'title': 'Choose VIP area',
        'price': 184
      }
    ]
  }
];


export { mockOffers };
