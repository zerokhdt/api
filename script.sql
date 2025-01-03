USE [Flutter_app]
GO
/****** Object:  Table [dbo].[Answer]    Script Date: 18/10/2024 8:17:10 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Answer](
	[AnswerID] [varchar](36) NOT NULL,
	[PurportAS] [nvarchar](max) NULL,
	[QuestionID] [varchar](36) NULL,
	[UserID] [varchar](36) NULL,
	[Times] [nvarchar](50) NULL,
	[Dates] [datetime2](7) NULL,
	[Priority] [bit] NULL,
 CONSTRAINT [PK_Answer] PRIMARY KEY CLUSTERED 
(
	[AnswerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CSCN]    Script Date: 18/10/2024 8:17:10 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CSCN](
	[CSCNID] [varchar](36) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Phone] [varchar](15) NULL,
	[Email] [varchar](100) NULL,
	[Address] [nvarchar](max) NULL,
	[Note] [nvarchar](max) NULL,
 CONSTRAINT [PK_CSCN] PRIMARY KEY CLUSTERED 
(
	[CSCNID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PKS]    Script Date: 18/10/2024 8:17:10 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PKS](
	[PKSID] [varchar](36) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Purportpks] [nvarchar](max) NULL,
	[Descriptionpks] [nvarchar](max) NULL,
	[TopicID] [varchar](36) NULL,
 CONSTRAINT [PK_PKS] PRIMARY KEY CLUSTERED 
(
	[PKSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Question]    Script Date: 18/10/2024 8:17:10 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Question](
	[QuestionID] [varchar](36) NOT NULL,
	[PurportQT] [nvarchar](max) NULL,
	[QuestiontypeID] [varchar](36) NULL,
	[PKSID] [varchar](36) NULL,
	[IsIndex] [nvarchar](max) NULL,
	[Fileimg] [nvarchar](max) NULL,
 CONSTRAINT [PK_Question] PRIMARY KEY CLUSTERED 
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Questiontype]    Script Date: 18/10/2024 8:17:10 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Questiontype](
	[QuestiontypeID] [varchar](36) NOT NULL,
	[Questiontype] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[IsFile] [bit] NULL,
 CONSTRAINT [PK_Questiontype] PRIMARY KEY CLUSTERED 
(
	[QuestiontypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Topic]    Script Date: 18/10/2024 8:17:10 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Topic](
	[TopicID] [varchar](36) NOT NULL,
	[Purporttp] [nvarchar](max) NULL,
	[Descriptiontp] [nvarchar](max) NULL,
 CONSTRAINT [PK_Topic] PRIMARY KEY CLUSTERED 
(
	[TopicID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 18/10/2024 8:17:10 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [varchar](36) NOT NULL,
	[Username] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Answer]  WITH CHECK ADD  CONSTRAINT [FK_Answer_Question] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Question] ([QuestionID])
GO
ALTER TABLE [dbo].[Answer] CHECK CONSTRAINT [FK_Answer_Question]
GO
ALTER TABLE [dbo].[Answer]  WITH CHECK ADD  CONSTRAINT [FK_Answer_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Answer] CHECK CONSTRAINT [FK_Answer_Users]
GO
ALTER TABLE [dbo].[PKS]  WITH CHECK ADD  CONSTRAINT [FK_PKS_Topic] FOREIGN KEY([TopicID])
REFERENCES [dbo].[Topic] ([TopicID])
GO
ALTER TABLE [dbo].[PKS] CHECK CONSTRAINT [FK_PKS_Topic]
GO
ALTER TABLE [dbo].[Question]  WITH CHECK ADD  CONSTRAINT [FK_Question_PKS] FOREIGN KEY([PKSID])
REFERENCES [dbo].[PKS] ([PKSID])
GO
ALTER TABLE [dbo].[Question] CHECK CONSTRAINT [FK_Question_PKS]
GO
ALTER TABLE [dbo].[Question]  WITH CHECK ADD  CONSTRAINT [FK_Question_Questiontype] FOREIGN KEY([QuestiontypeID])
REFERENCES [dbo].[Questiontype] ([QuestiontypeID])
GO
ALTER TABLE [dbo].[Question] CHECK CONSTRAINT [FK_Question_Questiontype]
GO
