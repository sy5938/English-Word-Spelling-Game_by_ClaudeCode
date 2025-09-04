# Git 操作流程学习文档

本文档记录了将本地项目上传到GitHub的完整Git命令流程，适合初学者学习参考。

## 📋 操作流程概览

1. 初始化本地Git仓库
2. 配置Git用户信息
3. 添加文件到暂存区
4. 创建提交
5. 连接远程仓库
6. 推送代码到GitHub

## 🔧 详细命令步骤

### 1. 检查当前Git状态
```bash
git status
```
**作用**: 检查当前目录是否已经是Git仓库
**结果**: 如果显示 "fatal: not a git repository" 说明需要初始化

### 2. 初始化Git仓库
```bash
git init
```
**作用**: 在当前目录创建一个新的Git仓库
**结果**: 创建 `.git` 隐藏文件夹，开始版本控制

### 3. 重命名主分支为main
```bash
git branch -m main
```
**作用**: 将默认的 master 分支重命名为 main (GitHub推荐)
**说明**: 现代Git推荐使用 main 作为主分支名

### 4. 配置Git用户信息
```bash
git config --global user.name "Siyu Wu(伍斯宇)"
git config --global user.email "18289665799@163.com"
```
**作用**: 设置全局的Git用户名和邮箱
**说明**: 
- `--global` 表示全局配置，所有仓库都会使用
- 去掉 `--global` 只对当前仓库生效
- 这些信息会出现在每次提交记录中

### 5. 添加文件到暂存区
```bash
git add .
```
**作用**: 将当前目录下所有文件添加到Git暂存区
**说明**: 
- `.` 表示当前目录的所有文件
- 也可以指定具体文件：`git add index.html`
- 暂存区是提交前的预备区域

### 6. 查看暂存区状态
```bash
git status
```
**作用**: 查看哪些文件已经添加到暂存区
**结果**: 显示 "Changes to be committed" 下的文件列表

### 7. 创建提交
```bash
git commit -m "$(cat <<'EOF'
feat: 初始化单词拼写背诵游戏项目

实现完整的网页版英语单词拼写学习游戏，包含：

核心功能:
- 多难度等级单词库 (简单/中等/困难)
- 智能语音发音 (Web Speech API)
- 游戏化积分系统 (得分/连击/等级)
- 本地进度保存 (localStorage)
- 错误单词复习功能

界面特色:
- 响应式设计，支持手机和电脑
- 精美渐变背景和动画效果
- 直观的用户交互体验

技术栈: HTML5 + CSS3 + Vanilla JavaScript

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```
**作用**: 将暂存区的文件正式提交到Git历史记录
**说明**: 
- `-m` 参数指定提交信息
- 使用 `$(cat <<'EOF' ... EOF)` 可以写多行提交信息
- 好的提交信息应该清楚描述做了什么改动

### 8. 连接远程仓库
```bash
git remote add origin https://github.com/sy5938/English-Word-Spelling-Game_by_ClaudeCode.git
```
**作用**: 添加远程仓库，命名为 origin
**说明**: 
- `origin` 是远程仓库的默认名称
- 这个URL是在GitHub创建仓库后获得的
- 可以添加多个远程仓库，使用不同名称

### 9. 推送代码到GitHub
```bash
git push https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/sy5938/English-Word-Spelling-Game_by_ClaudeCode.git main
```

#### 设置上游分支
 git push -u origin main
  说明: -u 是 --set-upstream 的简写，设置后以后就可以直接用 git push 了

  但你需要身份验证，所以完整命令是：
  git push -u
  https://ghp_xxxxxxxx@github.com/sy5938/English-Word-Spelling-Game_by_ClaudeCode.git
  main



**作用**: 将本地 main 分支推送到GitHub远程仓库
**说明**: 
- 这里使用了个人访问令牌(PAT)进行身份验证
- `ghp_` 开头的是GitHub个人访问令牌
- `main` 是要推送的分支名

## 🔐 GitHub身份验证方式

### 方式1: 个人访问令牌 (PAT) - 推荐
```bash
# 在URL中包含token
git push https://TOKEN@github.com/username/repo.git main

# 或者配置credential helper
git config --global credential.helper store
```

### 方式2: SSH密钥
```bash
# 生成SSH密钥
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 添加到ssh-agent
ssh-add ~/.ssh/id_rsa

# 使用SSH URL
git remote set-url origin git@github.com:username/repo.git
git push origin main
```

## 📝 常用Git命令速查

### 查看状态和历史
```bash
git status                  # 查看工作区状态
git log                     # 查看提交历史
git log --oneline           # 简化提交历史显示
git diff                    # 查看未暂存的改动
git diff --cached           # 查看已暂存的改动
```

### 分支操作
```bash
git branch                  # 查看本地分支
git branch -r               # 查看远程分支
git branch new-branch       # 创建新分支
git checkout branch-name    # 切换分支
git checkout -b new-branch  # 创建并切换到新分支
```

### 远程仓库操作
```bash
git remote -v               # 查看远程仓库
git fetch origin            # 获取远程更新
git pull origin main        # 拉取并合并远程更改
git push origin main        # 推送到远程仓库
```

### 撤销操作
```bash
git reset HEAD file         # 将文件从暂存区移除
git checkout -- file       # 撤销工作区的改动
git commit --amend          # 修改最后一次提交
```

## ⚠️ 常见问题和解决方案

### 问题1: 身份验证失败
```
fatal: could not read Username for 'https://github.com'
```
**解决**: 使用个人访问令牌或配置SSH密钥

### 问题2: 用户信息未配置
```
Author identity unknown
```
**解决**: 
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 问题3: 远程分支不存在
```
fatal: the requested upstream branch 'origin/main' does not exist
```
**解决**: 首次推送使用 `git push -u origin main` 建立跟踪关系

### 问题4: 推送被拒绝
```
! [rejected] main -> main (fetch first)
```
**解决**: 先拉取远程更改 `git pull origin main` 再推送

### 问题5: GitHub敏感信息保护
```
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote: - GITHUB PUSH PROTECTION
remote:   Push cannot contain secrets
```
**场景**: 不小心在代码中包含了API密钥、个人访问令牌等敏感信息
**解决方案**:

#### 方案A: 重写Git历史 (推荐)
```bash
# 1. 查看提交历史，确定需要修改哪些提交
git log --oneline
#输出：
b98894c (HEAD -> main, origin/main) docs: 添加Git学习文档和Claude配置
d125050 feat: 初始化单词拼写背诵游戏项目

# 2. 重置到包含敏感信息之前的提交
git reset --soft <clean-commit-hash>
#git reset --soft d125050

# 3. 重新暂存并提交（确保已移除敏感信息）
git add .
git commit -m "新的干净提交信息"

# 4. 强制推送覆盖远程历史
git push origin main --force
```

#### 方案B: 交互式历史重写
```bash
# 交互式重写最近3个提交
git rebase -i HEAD~3

# 在编辑器中将需要修改的提交标记为 'edit'
# 然后对每个提交进行修改
git commit --amend -m "修改后的提交信息"
git rebase --continue
```

#### 方案C: 使用GitHub提供的链接
- GitHub会提供一个临时链接允许推送包含敏感信息的提交
- 但不推荐，应该从源头解决安全问题

**⚠️ 重要提醒**:
- `git push --force` 会覆盖远程仓库历史，团队协作时需谨慎使用
- 重写历史后，其他协作者需要重新同步代码
- 最好的做法是从一开始就不要提交敏感信息

## 🎯 最佳实践

1. **提交信息规范**:
   - `feat:` 新功能
   - `fix:` 修复bug
   - `docs:` 文档更新
   - `style:` 代码格式调整
   - `refactor:` 代码重构

2. **频繁小提交**: 每完成一个小功能就提交一次

3. **先测试再提交**: 确保代码能正常运行

4. **使用 .gitignore**: 排除不需要版本控制的文件
   ```
   node_modules/
   .env
   *.log
   .DS_Store
   ```

5. **分支管理**: 
   - `main` 主分支保持稳定
   - `develop` 开发分支
   - `feature/xxx` 功能分支

## 📚 进阶学习

- [Git官方文档](https://git-scm.com/doc)
- [GitHub官方指南](https://guides.github.com/)
- [交互式Git学习](https://learngitbranching.js.org/)

---

这个流程记录了从零开始创建Git仓库并上传到GitHub的完整过程。建议多练习这些基础命令，熟练后可以探索更多高级功能！