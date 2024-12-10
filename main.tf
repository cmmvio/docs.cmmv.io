provider "aws" {
  region = "us-east-1"
}

resource "aws_ecs_cluster" "docs_cluster" {
  name = "docs-cluster"
}

resource "aws_ecs_task_definition" "docs_task" {
  family                   = "docs-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "docs-en"
      image     = "your-docker-image:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]
      environment = [
        { name = "DOCS_LANG", value = "en" },
        { name = "PORT", value = "3000" }
      ]
    },
    {
      name      = "docs-ptbr"
      image     = "your-docker-image:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3001
          protocol      = "tcp"
        }
      ]
      environment = [
        { name = "DOCS_LANG", value = "ptbr" },
        { name = "PORT", value = "3001" }
      ]
    }
  ])
}

resource "aws_ecs_service" "docs_service" {
  name            = "docs-service"
  cluster         = aws_ecs_cluster.docs_cluster.id
  task_definition = aws_ecs_task_definition.docs_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = ["subnet-your-id"]
    security_groups = ["sg-your-id"]
    assign_public_ip = true
  }
}

resource "aws_lb" "docs_lb" {
  name               = "docs-loadbalancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["sg-your-id"]
  subnets            = ["subnet-your-id"]
}

resource "aws_lb_listener" "docs_listener" {
  load_balancer_arn = aws_lb.docs_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "404 Not Found"
      status_code  = "404"
    }
  }
}

resource "aws_lb_listener_rule" "docs_en_rule" {
  listener_arn = aws_lb_listener.docs_listener.arn
  priority     = 1

  conditions {
    host_header {
      values = ["cmmv.io"]
    }
  }

  actions {
    type             = "forward"
    target_group_arn = aws_lb_target_group.docs_en_target.arn
  }
}

resource "aws_lb_listener_rule" "docs_ptbr_rule" {
  listener_arn = aws_lb_listener.docs_listener.arn
  priority     = 2

  conditions {
    host_header {
      values = ["pt.cmmv.io"]
    }
  }

  actions {
    type             = "forward"
    target_group_arn = aws_lb_target_group.docs_ptbr_target.arn
  }
}

resource "aws_lb_target_group" "docs_en_target" {
  name        = "docs-en-target"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = "vpc-your-id"

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb_target_group" "docs_ptbr_target" {
  name        = "docs-ptbr-target"
  port        = 3001
  protocol    = "HTTP"
  vpc_id      = "vpc-your-id"

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}
