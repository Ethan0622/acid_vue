export default {
  name: '酸碱中和反应',
  comment: '',
  paragraphs: [
    {
      id: '初始画面',
      talks: [
        '嘿~！这不是新来的实验家吗？你好呀！',
        '很高兴你能接受这次【酸碱中和反应实验】的挑战任务。',
        '嗯？你问我是谁？不好意思忘记自我介绍了Σ(0△0||) ！',
        '我呢~是这次实验的导航精灵，也可以把我当作是你的小助手哦，在这次任务中我会尽全力帮助你完成这次实验的。 ',
        '这次的任务需要我们掌握正确的实验仪器操作方法，并学会利用不同的酸碱指示剂，观察与探究酸溶液与碱溶液之间发生的化学现象与反应。',
        '那么聪明勇敢的实验家，准备好开始这次的实验旅程了吗？'
      ],
      responses: [
        { name: '我准备好了！', feedbacks: ['很好！很有精神！'] },
        { name: '看起来好难...', feedbacks: ['嘿~放轻松，我可是很相信实验家的实力的，我也会帮助你一起完成这次任务的。'] }
      ]
    },
    {
      id: '选择酸溶液',
      talks: [
        '事不宜迟，我们先试着开始实验的第一步吧。',
        '嘛~，因为这次的实验是【酸碱中和反应实验】，那么酸溶液自然是必不可少的。',
        '这次我特意为你准备了两种酸性溶液供你选择哦，你想使用哪一种酸性溶液呢？'
      ],
      responses: [
        { name: '稀盐酸', feedbacks: ['稀盐酸~！就决定是你了！'] },
        { name: '稀硫酸', feedbacks: ['现在轮到你了~！稀硫酸~！'] }
      ]
    },
    {
      id: '夸奖',
      talks: ['呼~好啦，需要的酸溶液已经被召唤出来了，顺便一些要用到的实验器材也帮你准备好啦。'],
      responses: [
        { name: '干的漂亮！', feedbacks: ["谢谢夸奖~！虽然这是我应该做的事情啦，不过不介意的话也可以多夸夸我哦o(〃'▽'〃)o。"] },
        { name: '谢谢你！', feedbacks: ['不客气哦~，能帮助到实验师是我应该做的事情啦。'] }
      ]
    },
    {
      id: '滴加酸溶液1',
      talks: ['现在酸溶液已经选择好啦，这一次我先帮你把酸溶液滴入试管中吧~。', '接下来请一定要注意观察下面的实验操作哦。']
    },
    {
      id: '滴加酸溶液2',
      talks: [
        '好啦，现在酸溶液已经滴入完成了，不知道实验师看清了刚才的实验操作了吗？',
        '接下来我要开始提问了。',
        '聪明的实验师，你觉得刚才滴入溶液的操作是规范的吗？'
      ],
      responses: [
        { name: '我觉得非常规范', feedbacks: ['很遗憾，没有回答正确哦。'] },
        { name: '我感觉有一处不对劲..', feedbacks: ['bingo~！回答正确！'] },
        { name: '我想再看一遍', feedbacks: ['行'] }
      ]
    }
  ]
}
