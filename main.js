$(function() {
    addReset()
    addTarefa()
    addGatilhoTarefa()
    addGatilhoQuadro()
  })
  
  function addReset() {
    $('.reset').click(()=>{
      $('.lista-tarefas').html('')
    })
  }
  
  function addTarefa() {
    let contadorId = 0
    $('.botao.adiciona-tarefa').click(() => {
      const campo = $('.campo.adiciona-tarefa')
      if(campo.val() != ''){
      contadorId++
      const texto = campo.val()
      campo.val('')
  
      const botaoRemover = $('<i>').addClass('botao-remover material-icons').text('close')
      $(botaoRemover).click(removerTarefa)
  
      const tarefa = $('<div>').addClass('tarefa').attr('id', contadorId).attr('draggable', true).html([texto,botaoRemover])
      $('.quadro.fazer .lista-tarefas').append(tarefa)
      addGatilhoTarefa()
      } else {
        campo.addClass('pulse')
        setTimeout(()=>campo.removeClass('pulse'),800)
      }
    })
  }
  
  function addGatilhoTarefa() {
    const tarefas = $('.tarefa')
    for(const tarefa of tarefas) {
      tarefa.addEventListener('dragstart', dragStart)
      tarefa.addEventListener('dragend', dragEnd)
      tarefa.addEventListener('touchmove', touchMove)
      tarefa.addEventListener('touchend', touchEnd)
    }
  }
  
  function addGatilhoQuadro() {
    const quadros = document.querySelectorAll('.quadro');
    for(const quadro of quadros) {
      quadro.addEventListener('dragover', allowDrop)
      quadro.addEventListener('drop', drop)
    }
  }
  
  function removerTarefa(event) {
    const tarefa = $(event.target.parentNode)
    tarefa.fadeOut(400)
    setTimeout(()=>tarefa.remove(), 500)
  }
  
  // Drag and Drop Methods
  
  function allowDrop(event) {
    event.preventDefault()
  }
  
  function dragStart(event) {
    const tarefa = $(event.target)
    event.dataTransfer.setData("text", tarefa.attr('id'))
    tarefa.addClass('esconder')
  }
  
  function drop(event) {
    const tarefa = $('#' + event.dataTransfer.getData("text"))
    const slot = event.target
    inseretarefa(tarefa, slot)
  }
  
  function dragEnd(event) {
    const tarefa = $(event.target)
    tarefa.removeClass('esconder')
  }
  
  // Touch Mothods
  
  function touchMove(event) {
    const tarefaId = $(event.target).attr('id')
    const tarefa = $('#' + tarefaId).addClass('esconder')
    const conteudo = tarefa.html()
    $('#tarefa-clone').html(conteudo).css('display', 'block').css('background-color',tarefa.css('background-color')).css('left', event.touches[0].clientX - 30).css('top', event.touches[0].clientY - 20)
  }
  
  function touchEnd(event) {
    const clone = $('#tarefa-clone')
    const corX = parseInt($(clone).css('left'))
    const corY = parseInt($(clone).css('top'))
    const slot = document.elementFromPoint(corX, corY)
    const tarefaId = $(event.target).attr('id')
    const tarefa = $('#' + tarefaId).removeClass('esconder')
  
    clone.css('display', 'none')
    inseretarefa(tarefa, slot)
  }
  
  function inseretarefa(tarefa, slot) {
    if($(slot).hasClass('lista-tarefas')) {
      $(slot).append(tarefa)
    }
  }