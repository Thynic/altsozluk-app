const araForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const anlamlar = document.querySelector('#anlamlar')

araForm.addEventListener('submit', (e) => {
    anlamlar.textContent = ''
    e.preventDefault()

    const aranan = search.value

    messageOne.textContent = 'Aranıyor...'
    

    fetch('https://sozluk.gov.tr/gts?ara=' + encodeURIComponent(aranan)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = ''
                data.forEach((fark, index) => {
                    const bulunan = document.createElement('p')
                    if(fark.lisan) {
                        bulunan.innerHTML = fark.madde + ', <span id="lisan">' + '('+ fark.lisan + ')' + '</span>:'
                    }
                    else
                        bulunan.textContent = fark.madde + ':'

                    anlamlar.append(bulunan)
                    const tur = fark.anlamlarListe[0].ozelliklerListe[0].tam_adi
                    fark.anlamlarListe.forEach((anlam, index) => {
                        if(anlam) {
                            const herAnlam = document.createElement('p')
                            herAnlam.textContent = anlam.anlam_sira + '. ' + tur + ': ' + anlam.anlam
                            herAnlam.id = 'kelime'
                            anlamlar.append(herAnlam)
                            if (anlam.orneklerListe) {
                                anlam.orneklerListe.forEach((ornekM) => {
                                    const herOrnek = document.createElement('p')
                                    herOrnek.textContent = '"' + ornekM.ornek + '"'
                                    if(ornekM.yazar) {
                                        herOrnek.textContent += '    -' + ornekM.yazar[0].tam_adi
                                    }
                                    herOrnek.id = 'ornek'
                                    anlamlar.append(herOrnek)
                                })
                            }
                            
                        }
                    })
                    if(data[index+1])
                        document.createElement('p')
                })
            }
            search.value = ''
        })
    })
})