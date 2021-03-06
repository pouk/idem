import test from 'ava'

import murmurhash3 from '..'

test('x86 32bit', t => {
  const { hash32 } = murmurhash3.x86

  t.is(hash32(''), 0)
  t.is(hash32('0'), 3530670207)
  t.is(hash32('01'), 1642882560)
  t.is(hash32('012'), 3966566284)
  t.is(hash32('0123'), 3558446240)
  t.is(hash32('01234'), 433070448)

  t.is(hash32('', 1), 1364076727, 'seed 1')
})

test('x86 128bit', t => {
  const { hash128 } = murmurhash3.x86

  t.is(hash128(''), '00000000000000000000000000000000')
  t.is(hash128('0'), '0ab2409ea5eb34f8a5eb34f8a5eb34f8')
  t.is(hash128('01'), '0f87acb4674f3b21674f3b21674f3b21')
  t.is(hash128('012'), 'cd94fea54c13d78e4c13d78e4c13d78e')
  t.is(hash128('0123'), 'dc378fea485d3536485d3536485d3536')
  t.is(hash128('01234'), '35c5b3ee7b3b211600ae108800ae1088')
  t.is(hash128('012345'), 'db26dc756ce1944bf825536af825536a')
  t.is(hash128('0123456'), 'b708d0a186d15c02495d053b495d053b')
  t.is(hash128('01234567'), 'aa22bf849216040263b83c5e63b83c5e')
  t.is(hash128('012345678'), '571b5f6775d48126d0205c304ca675dc')
  t.is(hash128('0123456789'), '0017a61e2e528b33a5443f2057a11235')
  t.is(hash128('0123456789a'), '38a2ed0f921f15e42caa7f97a971884f')
  t.is(hash128('0123456789ab'), 'cfaa93f9b6982a7e53412b5d04d3d08f')
  t.is(hash128('0123456789abc'), 'c970af1dcc6d9d01dd00c683fc11eee3')
  t.is(hash128('0123456789abcd'), '6f34d20ac0a5114dae0d83c563f51794')
  t.is(hash128('0123456789abcde'), '3c76c46d4d0818c0add433daa78673fa')
  t.is(hash128('0123456789abcdef'), 'fb7d440936aed30a48ad1d9b572b3bfd')

  t.is(hash128('', 1), '88c4adec54d201b954d201b954d201b9', 'seed 1')
})

test('x64 128bit', t => {
  const { hash128 } = murmurhash3.x64

  t.is(hash128(''), '00000000000000000000000000000000')
  t.is(hash128('0'), '2ac9debed546a3803a8de9e53c875e09')
  t.is(hash128('01'), '649e4eaa7fc1708ee6945110230f2ad6')
  t.is(hash128('012'), 'ce68f60d7c353bdb00364cd5936bf18a')
  t.is(hash128('0123'), '0f95757ce7f38254b4c67c9e6f12ab4b')
  t.is(hash128('01234'), '0f04e459497f3fc1eccc6223a28dd613')
  t.is(hash128('012345'), '88c0a92586be0a2781062d6137728244')
  t.is(hash128('0123456'), '13eb9fb82606f7a6b4ebef492fdef34e')
  t.is(hash128('01234567'), '8236039b7387354dc3369387d8964920')
  t.is(hash128('012345678'), '4c1e87519fe738ba72a17af899d597f1')
  t.is(hash128('0123456789'), '3f9652ac3effeb248027a17cf2990b07')
  t.is(hash128('0123456789a'), '4bc3eacd29d386297cb2d9e797da9c92')
  t.is(hash128('0123456789ab'), '66352b8cee9e3ca7a9edf0b381a8fc58')
  t.is(hash128('0123456789abc'), '5eb2f8db4265931e801ce853e61d0ab7')
  t.is(hash128('0123456789abcd'), '07a4a014dd59f71aaaf437854cd22231')
  t.is(hash128('0123456789abcde'), 'a62dd5f6c0bf23514fccf50c7c544cf0')
  t.is(hash128('0123456789abcdef'), '4be06d94cf4ad1a787c35b5c63a708da')

  t.is(hash128('', 1), '4610abe56eff5cb551622daa78f83583', 'seed 1')
})
